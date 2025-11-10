#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import Amadeus from "amadeus";

// Initialize Amadeus client
let amadeusClient: Amadeus | null = null;

function getAmadeusClient(): Amadeus {
  if (!amadeusClient) {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;
    const hostname = process.env.AMADEUS_HOSTNAME || "production";

    if (!clientId || !clientSecret) {
      throw new Error(
        "AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET environment variables are required"
      );
    }

    amadeusClient = new Amadeus({
      clientId,
      clientSecret,
      hostname,
    });
  }

  return amadeusClient;
}

// Define all Amadeus API tools
const tools: Tool[] = [
  // Flight Shopping APIs
  {
    name: "flight_offers_search",
    description:
      "Search for flight offers between origin and destination on specific dates. Returns flight options with pricing.",
    inputSchema: {
      type: "object",
      properties: {
        originLocationCode: {
          type: "string",
          description: "IATA code of the departure city/airport (e.g., NYC, LON)",
        },
        destinationLocationCode: {
          type: "string",
          description: "IATA code of the arrival city/airport",
        },
        departureDate: {
          type: "string",
          description: "Departure date in YYYY-MM-DD format",
        },
        returnDate: {
          type: "string",
          description: "Return date in YYYY-MM-DD format (optional for one-way)",
        },
        adults: {
          type: "number",
          description: "Number of adult passengers (default: 1)",
        },
        max: {
          type: "number",
          description: "Maximum number of flight offers to return (default: 250)",
        },
      },
      required: ["originLocationCode", "destinationLocationCode", "departureDate"],
    },
  },
  {
    name: "flight_offers_pricing",
    description:
      "Confirm pricing and availability for specific flight offers before booking",
    inputSchema: {
      type: "object",
      properties: {
        flightOffers: {
          type: "array",
          description: "Array of flight offers from flight_offers_search",
        },
      },
      required: ["flightOffers"],
    },
  },
  {
    name: "flight_create_order",
    description: "Create a flight booking/order for confirmed flight offers",
    inputSchema: {
      type: "object",
      properties: {
        flightOffers: {
          type: "array",
          description: "Priced flight offers from flight_offers_pricing",
        },
        travelers: {
          type: "array",
          description:
            "Traveler details including name, contact, date of birth, passport info",
        },
      },
      required: ["flightOffers", "travelers"],
    },
  },
  {
    name: "flight_order_get",
    description: "Retrieve details of a specific flight order by ID",
    inputSchema: {
      type: "object",
      properties: {
        flightOrderId: {
          type: "string",
          description: "The flight order ID",
        },
      },
      required: ["flightOrderId"],
    },
  },
  {
    name: "flight_order_delete",
    description: "Cancel/delete a flight order",
    inputSchema: {
      type: "object",
      properties: {
        flightOrderId: {
          type: "string",
          description: "The flight order ID to cancel",
        },
      },
      required: ["flightOrderId"],
    },
  },
  {
    name: "flight_inspiration_search",
    description:
      "Find cheapest destinations from origin for flexible travel dates",
    inputSchema: {
      type: "object",
      properties: {
        origin: {
          type: "string",
          description: "IATA code of origin city/airport",
        },
        maxPrice: {
          type: "number",
          description: "Maximum price per traveler",
        },
      },
      required: ["origin"],
    },
  },
  {
    name: "flight_cheapest_date_search",
    description: "Find cheapest dates to travel between two locations",
    inputSchema: {
      type: "object",
      properties: {
        origin: {
          type: "string",
          description: "IATA code of origin",
        },
        destination: {
          type: "string",
          description: "IATA code of destination",
        },
      },
      required: ["origin", "destination"],
    },
  },
  {
    name: "flight_availability_search",
    description:
      "Search for flight availability with specific constraints (advanced)",
    inputSchema: {
      type: "object",
      properties: {
        originDestinations: {
          type: "array",
          description: "Array of origin-destination pairs with dates",
        },
        travelers: {
          type: "array",
          description: "Traveler types and counts",
        },
        sources: {
          type: "array",
          description: "Distribution sources (e.g., GDS)",
        },
      },
      required: ["originDestinations", "travelers", "sources"],
    },
  },
  {
    name: "seatmap_display",
    description: "Get seat maps for a flight to see available seats",
    inputSchema: {
      type: "object",
      properties: {
        flightOffers: {
          type: "array",
          description: "Flight offers to get seat maps for",
        },
      },
      required: ["flightOffers"],
    },
  },
  {
    name: "branded_fares_upsell",
    description: "Get branded fare options with additional services",
    inputSchema: {
      type: "object",
      properties: {
        flightOffers: {
          type: "array",
          description: "Flight offers to get branded fares for",
        },
      },
      required: ["flightOffers"],
    },
  },
  {
    name: "flight_choice_prediction",
    description: "Predict which flight offer a traveler is most likely to choose",
    inputSchema: {
      type: "object",
      properties: {
        flightOffers: {
          type: "array",
          description: "Flight offers to predict choice from",
        },
      },
      required: ["flightOffers"],
    },
  },

  // Hotel APIs
  {
    name: "hotel_offers_search",
    description:
      "Search for hotel offers in a city or by geographic coordinates",
    inputSchema: {
      type: "object",
      properties: {
        cityCode: {
          type: "string",
          description: "IATA city code (e.g., PAR for Paris)",
        },
        latitude: {
          type: "number",
          description: "Latitude for geographic search",
        },
        longitude: {
          type: "number",
          description: "Longitude for geographic search",
        },
        checkInDate: {
          type: "string",
          description: "Check-in date in YYYY-MM-DD format",
        },
        checkOutDate: {
          type: "string",
          description: "Check-out date in YYYY-MM-DD format",
        },
        adults: {
          type: "number",
          description: "Number of adult guests",
        },
        radius: {
          type: "number",
          description: "Search radius in km",
        },
      },
      required: [],
    },
  },
  {
    name: "hotel_offer_search",
    description: "Get detailed information about a specific hotel offer",
    inputSchema: {
      type: "object",
      properties: {
        offerId: {
          type: "string",
          description: "Hotel offer ID",
        },
      },
      required: ["offerId"],
    },
  },
  {
    name: "hotel_booking",
    description: "Book a hotel room",
    inputSchema: {
      type: "object",
      properties: {
        offerId: {
          type: "string",
          description: "Hotel offer ID to book",
        },
        guests: {
          type: "array",
          description: "Guest information",
        },
        payments: {
          type: "array",
          description: "Payment information",
        },
      },
      required: ["offerId", "guests", "payments"],
    },
  },
  {
    name: "hotel_list_by_city",
    description: "List all hotels in a specific city",
    inputSchema: {
      type: "object",
      properties: {
        cityCode: {
          type: "string",
          description: "IATA city code",
        },
      },
      required: ["cityCode"],
    },
  },
  {
    name: "hotel_list_by_geocode",
    description: "List hotels near specific coordinates",
    inputSchema: {
      type: "object",
      properties: {
        latitude: {
          type: "number",
          description: "Latitude",
        },
        longitude: {
          type: "number",
          description: "Longitude",
        },
        radius: {
          type: "number",
          description: "Search radius in km",
        },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "hotel_sentiments",
    description: "Get hotel reviews sentiment analysis",
    inputSchema: {
      type: "object",
      properties: {
        hotelIds: {
          type: "string",
          description: "Comma-separated list of hotel IDs",
        },
      },
      required: ["hotelIds"],
    },
  },

  // Points of Interest & Activities
  {
    name: "points_of_interest_search",
    description: "Search for tourist attractions and points of interest",
    inputSchema: {
      type: "object",
      properties: {
        latitude: {
          type: "number",
          description: "Latitude",
        },
        longitude: {
          type: "number",
          description: "Longitude",
        },
        radius: {
          type: "number",
          description: "Search radius in km (default: 1)",
        },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "points_of_interest_by_square",
    description: "Get points of interest in a geographic square area",
    inputSchema: {
      type: "object",
      properties: {
        north: {
          type: "number",
          description: "North latitude",
        },
        south: {
          type: "number",
          description: "South latitude",
        },
        east: {
          type: "number",
          description: "East longitude",
        },
        west: {
          type: "number",
          description: "West longitude",
        },
      },
      required: ["north", "south", "east", "west"],
    },
  },
  {
    name: "point_of_interest_details",
    description: "Get detailed information about a specific point of interest",
    inputSchema: {
      type: "object",
      properties: {
        poiId: {
          type: "string",
          description: "Point of interest ID",
        },
      },
      required: ["poiId"],
    },
  },
  {
    name: "activities_search",
    description: "Search for tours and activities by location",
    inputSchema: {
      type: "object",
      properties: {
        latitude: {
          type: "number",
          description: "Latitude",
        },
        longitude: {
          type: "number",
          description: "Longitude",
        },
        radius: {
          type: "number",
          description: "Search radius in km",
        },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "activities_by_square",
    description: "Get activities in a geographic square area",
    inputSchema: {
      type: "object",
      properties: {
        north: {
          type: "number",
          description: "North latitude",
        },
        south: {
          type: "number",
          description: "South latitude",
        },
        east: {
          type: "number",
          description: "East longitude",
        },
        west: {
          type: "number",
          description: "West longitude",
        },
      },
      required: ["north", "south", "east", "west"],
    },
  },
  {
    name: "activity_details",
    description: "Get detailed information about a specific activity",
    inputSchema: {
      type: "object",
      properties: {
        activityId: {
          type: "string",
          description: "Activity ID",
        },
      },
      required: ["activityId"],
    },
  },

  // Transfer APIs
  {
    name: "transfer_search",
    description: "Search for private transfer options between locations",
    inputSchema: {
      type: "object",
      properties: {
        startLocationCode: {
          type: "string",
          description: "IATA code of pickup location",
        },
        endLocationCode: {
          type: "string",
          description: "IATA code of dropoff location",
        },
        startDateTime: {
          type: "string",
          description: "Pickup datetime in ISO format",
        },
        passengers: {
          type: "number",
          description: "Number of passengers",
        },
      },
      required: ["startLocationCode", "endLocationCode", "startDateTime"],
    },
  },
  {
    name: "transfer_booking",
    description: "Book a transfer service",
    inputSchema: {
      type: "object",
      properties: {
        offerId: {
          type: "string",
          description: "Transfer offer ID",
        },
        passengers: {
          type: "array",
          description: "Passenger details",
        },
      },
      required: ["offerId", "passengers"],
    },
  },
  {
    name: "transfer_cancellation",
    description: "Cancel a transfer booking",
    inputSchema: {
      type: "object",
      properties: {
        transferOrderId: {
          type: "string",
          description: "Transfer order ID to cancel",
        },
      },
      required: ["transferOrderId"],
    },
  },

  // Reference Data APIs
  {
    name: "location_search",
    description:
      "Search for airports and cities with autocomplete (useful for finding IATA codes)",
    inputSchema: {
      type: "object",
      properties: {
        keyword: {
          type: "string",
          description: "City or airport name to search for",
        },
        subType: {
          type: "string",
          description: "Filter by type: AIRPORT, CITY",
        },
      },
      required: ["keyword"],
    },
  },
  {
    name: "airport_city_search",
    description: "Search specifically for airports and cities",
    inputSchema: {
      type: "object",
      properties: {
        keyword: {
          type: "string",
          description: "Search keyword",
        },
      },
      required: ["keyword"],
    },
  },
  {
    name: "nearest_airport",
    description: "Find nearest airport to given coordinates",
    inputSchema: {
      type: "object",
      properties: {
        latitude: {
          type: "number",
          description: "Latitude",
        },
        longitude: {
          type: "number",
          description: "Longitude",
        },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "airline_lookup",
    description: "Look up airline information by IATA or ICAO code",
    inputSchema: {
      type: "object",
      properties: {
        airlineCodes: {
          type: "string",
          description: "Comma-separated airline codes",
        },
      },
      required: ["airlineCodes"],
    },
  },
  {
    name: "checkin_links",
    description: "Get airline check-in URLs",
    inputSchema: {
      type: "object",
      properties: {
        airlineCode: {
          type: "string",
          description: "IATA airline code",
        },
      },
      required: ["airlineCode"],
    },
  },
  {
    name: "airport_routes",
    description: "Get direct routes from an airport",
    inputSchema: {
      type: "object",
      properties: {
        departureAirportCode: {
          type: "string",
          description: "IATA airport code",
        },
      },
      required: ["departureAirportCode"],
    },
  },
  {
    name: "airline_routes",
    description: "Get destinations served by an airline",
    inputSchema: {
      type: "object",
      properties: {
        airlineCode: {
          type: "string",
          description: "IATA airline code",
        },
      },
      required: ["airlineCode"],
    },
  },

  // Travel Analytics
  {
    name: "most_booked_destinations",
    description: "Get most booked flight destinations from an origin",
    inputSchema: {
      type: "object",
      properties: {
        originCityCode: {
          type: "string",
          description: "IATA origin city code",
        },
        period: {
          type: "string",
          description: "Time period (YYYY-MM format)",
        },
      },
      required: ["originCityCode", "period"],
    },
  },
  {
    name: "most_traveled_destinations",
    description: "Get most traveled destinations from an origin",
    inputSchema: {
      type: "object",
      properties: {
        originCityCode: {
          type: "string",
          description: "IATA origin city code",
        },
        period: {
          type: "string",
          description: "Time period (YYYY-MM format)",
        },
      },
      required: ["originCityCode", "period"],
    },
  },
  {
    name: "busiest_travel_period",
    description: "Find the busiest travel period for a route",
    inputSchema: {
      type: "object",
      properties: {
        cityCode: {
          type: "string",
          description: "IATA city code",
        },
        period: {
          type: "string",
          description: "Year (YYYY)",
        },
      },
      required: ["cityCode", "period"],
    },
  },
  {
    name: "location_score",
    description: "Get safety and tourism scores for a location",
    inputSchema: {
      type: "object",
      properties: {
        latitude: {
          type: "number",
          description: "Latitude",
        },
        longitude: {
          type: "number",
          description: "Longitude",
        },
      },
      required: ["latitude", "longitude"],
    },
  },

  // Predictions
  {
    name: "flight_delay_prediction",
    description: "Predict likelihood of flight delay",
    inputSchema: {
      type: "object",
      properties: {
        originLocationCode: {
          type: "string",
          description: "IATA origin code",
        },
        destinationLocationCode: {
          type: "string",
          description: "IATA destination code",
        },
        departureDate: {
          type: "string",
          description: "Departure date",
        },
        departureTime: {
          type: "string",
          description: "Departure time",
        },
        arrivalDate: {
          type: "string",
          description: "Arrival date",
        },
        arrivalTime: {
          type: "string",
          description: "Arrival time",
        },
        aircraftCode: {
          type: "string",
          description: "Aircraft code",
        },
        carrierCode: {
          type: "string",
          description: "Airline code",
        },
        flightNumber: {
          type: "string",
          description: "Flight number",
        },
      },
      required: [
        "originLocationCode",
        "destinationLocationCode",
        "departureDate",
        "departureTime",
        "arrivalDate",
        "arrivalTime",
        "aircraftCode",
        "carrierCode",
        "flightNumber",
      ],
    },
  },
  {
    name: "trip_purpose_prediction",
    description: "Predict if a trip is for business or leisure",
    inputSchema: {
      type: "object",
      properties: {
        originLocationCode: {
          type: "string",
          description: "IATA origin code",
        },
        destinationLocationCode: {
          type: "string",
          description: "IATA destination code",
        },
        departureDate: {
          type: "string",
          description: "Departure date",
        },
        returnDate: {
          type: "string",
          description: "Return date",
        },
      },
      required: [
        "originLocationCode",
        "destinationLocationCode",
        "departureDate",
        "returnDate",
      ],
    },
  },
  {
    name: "airport_on_time_performance",
    description: "Get on-time performance predictions for an airport",
    inputSchema: {
      type: "object",
      properties: {
        airportCode: {
          type: "string",
          description: "IATA airport code",
        },
        date: {
          type: "string",
          description: "Date in YYYY-MM-DD format",
        },
      },
      required: ["airportCode", "date"],
    },
  },
  {
    name: "flight_price_analysis",
    description:
      "Analyze flight price metrics and get quartile price distributions",
    inputSchema: {
      type: "object",
      properties: {
        originIataCode: {
          type: "string",
          description: "IATA origin code",
        },
        destinationIataCode: {
          type: "string",
          description: "IATA destination code",
        },
        departureDate: {
          type: "string",
          description: "Departure date",
        },
      },
      required: ["originIataCode", "destinationIataCode", "departureDate"],
    },
  },

  // Flight Operations
  {
    name: "flight_status",
    description: "Get real-time flight status",
    inputSchema: {
      type: "object",
      properties: {
        carrierCode: {
          type: "string",
          description: "Airline IATA code",
        },
        flightNumber: {
          type: "string",
          description: "Flight number",
        },
        scheduledDepartureDate: {
          type: "string",
          description: "Scheduled departure date (YYYY-MM-DD)",
        },
      },
      required: ["carrierCode", "flightNumber", "scheduledDepartureDate"],
    },
  },
];

// Create server instance
const server = new Server(
  {
    name: "travel-amadeus-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools,
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    const amadeus = getAmadeusClient();
    let response;
    const parameters = args || {};

    switch (name) {
      // Flight Shopping
      case "flight_offers_search":
        response = await amadeus.shopping.flightOffersSearch.get(parameters);
        break;

      case "flight_offers_pricing":
        response = await amadeus.shopping.flightOffers.pricing.post(
          parameters.flightOffers
        );
        break;

      case "flight_create_order":
        response = await amadeus.booking.flightOrders.post(parameters);
        break;

      case "flight_order_get":
        response = await amadeus.booking
          .flightOrder(parameters.flightOrderId as string)
          .get();
        break;

      case "flight_order_delete":
        response = await amadeus.booking
          .flightOrder(parameters.flightOrderId as string)
          .delete();
        break;

      case "flight_inspiration_search":
        response = await amadeus.shopping.flightDestinations.get(parameters);
        break;

      case "flight_cheapest_date_search":
        response = await amadeus.shopping.flightDates.get(parameters);
        break;

      case "flight_availability_search":
        response = await amadeus.shopping.availability.flightAvailabilities.post(
          parameters
        );
        break;

      case "seatmap_display":
        response = await amadeus.shopping.seatmaps.post(parameters);
        break;

      case "branded_fares_upsell":
        response = await amadeus.shopping.flightOffers.upselling.post(
          parameters
        );
        break;

      case "flight_choice_prediction":
        response = await amadeus.shopping.flightOffers.prediction.post(
          parameters
        );
        break;

      // Hotels
      case "hotel_offers_search":
        response = await amadeus.shopping.hotelOffersSearch.get(parameters);
        break;

      case "hotel_offer_search":
        response = await amadeus.shopping
          .hotelOfferSearch(parameters.offerId as string)
          .get();
        break;

      case "hotel_booking":
        response = await amadeus.booking.hotelBookings.post(parameters);
        break;

      case "hotel_list_by_city":
        response = await amadeus.referenceData.locations.hotels.byCity.get(parameters);
        break;

      case "hotel_list_by_geocode":
        response = await amadeus.referenceData.locations.hotels.byGeocode.get(
          parameters
        );
        break;

      case "hotel_sentiments":
        response = await amadeus.eReputation.hotelSentiments.get(parameters);
        break;

      // Points of Interest & Activities
      case "points_of_interest_search":
        response = await amadeus.referenceData.locations.pointsOfInterest.get(
          parameters
        );
        break;

      case "points_of_interest_by_square":
        response =
          await amadeus.referenceData.locations.pointsOfInterest.bySquare.get(
            parameters
          );
        break;

      case "point_of_interest_details":
        response = await amadeus.referenceData.locations
          .pointOfInterest(parameters.poiId as string)
          .get();
        break;

      case "activities_search":
        response = await amadeus.shopping.activities.get(parameters);
        break;

      case "activities_by_square":
        response = await amadeus.shopping.activities.bySquare.get(parameters);
        break;

      case "activity_details":
        response = await amadeus.shopping
          .activity(parameters.activityId as string)
          .get();
        break;

      // Transfers
      case "transfer_search":
        response = await amadeus.shopping.transferOffers.post(
          parameters
        );
        break;

      case "transfer_booking":
        response = await amadeus.ordering.transferOrders.post(
          parameters
        );
        break;

      case "transfer_cancellation":
        response = await amadeus.ordering
          .transferOrder(parameters.transferOrderId as string)
          .transfers.cancellation.post();
        break;

      // Reference Data
      case "location_search":
        response = await amadeus.referenceData.locations.get(parameters);
        break;

      case "airport_city_search":
        response = await amadeus.referenceData.locations.get(parameters);
        break;

      case "nearest_airport":
        response = await amadeus.referenceData.locations.airports.get(parameters);
        break;

      case "airline_lookup":
        response = await amadeus.referenceData.airlines.get(parameters);
        break;

      case "checkin_links":
        response = await amadeus.referenceData.urls.checkinLinks.get(parameters);
        break;

      case "airport_routes":
        response = await amadeus.airport.directDestinations.get(parameters);
        break;

      case "airline_routes":
        response = await amadeus.airline.destinations.get(parameters);
        break;

      // Analytics
      case "most_booked_destinations":
        response = await amadeus.travel.analytics.airTraffic.booked.get(parameters);
        break;

      case "most_traveled_destinations":
        response = await amadeus.travel.analytics.airTraffic.traveled.get(parameters);
        break;

      case "busiest_travel_period":
        response = await amadeus.travel.analytics.airTraffic.busiestPeriod.get(
          parameters
        );
        break;

      case "location_score":
        response = await amadeus.location.analytics.categoryRatedAreas.get(parameters);
        break;

      // Predictions
      case "flight_delay_prediction":
        response = await amadeus.travel.predictions.flightDelay.get(parameters);
        break;

      case "trip_purpose_prediction":
        response = await amadeus.travel.predictions.tripPurpose.get(parameters);
        break;

      case "airport_on_time_performance":
        response = await amadeus.airport.predictions.onTime.get(parameters);
        break;

      case "flight_price_analysis":
        response = await amadeus.analytics.itineraryPriceMetrics.get(parameters);
        break;

      // Flight Operations
      case "flight_status":
        response = await amadeus.schedule.flights.get(parameters);
        break;

      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}\n${error.description || ""}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Amadeus MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
