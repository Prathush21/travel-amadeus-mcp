declare module "amadeus" {
  interface AmadeusConfig {
    clientId: string;
    clientSecret: string;
    hostname?: string;
  }

  interface AmadeusResponse {
    data: any;
    result: any;
  }

  class Amadeus {
    constructor(config: AmadeusConfig);

    // Shopping
    shopping: {
      flightOffersSearch: {
        get(params: any): Promise<AmadeusResponse>;
        post(params: any): Promise<AmadeusResponse>;
      };
      flightDestinations: {
        get(params: any): Promise<AmadeusResponse>;
      };
      flightDates: {
        get(params: any): Promise<AmadeusResponse>;
      };
      flightOffers: {
        pricing: {
          post(params: any): Promise<AmadeusResponse>;
        };
        upselling: {
          post(params: any): Promise<AmadeusResponse>;
        };
        prediction: {
          post(params: any): Promise<AmadeusResponse>;
        };
      };
      seatmaps: {
        get(params: any): Promise<AmadeusResponse>;
        post(params: any): Promise<AmadeusResponse>;
      };
      availability: {
        flightAvailabilities: {
          post(params: any): Promise<AmadeusResponse>;
        };
      };
      hotelOffersSearch: {
        get(params: any): Promise<AmadeusResponse>;
      };
      hotelOfferSearch(offerId: string): {
        get(): Promise<AmadeusResponse>;
      };
      activities: {
        get(params: any): Promise<AmadeusResponse>;
        bySquare: {
          get(params: any): Promise<AmadeusResponse>;
        };
      };
      activity(activityId: string): {
        get(): Promise<AmadeusResponse>;
      };
      transferOffers: {
        post(params: any): Promise<AmadeusResponse>;
      };
    };

    // Booking
    booking: {
      flightOrders: {
        post(params: any): Promise<AmadeusResponse>;
      };
      flightOrder(orderId: string): {
        get(): Promise<AmadeusResponse>;
        delete(): Promise<AmadeusResponse>;
      };
      hotelBookings: {
        post(params: any): Promise<AmadeusResponse>;
      };
      hotelOrders: {
        post(params: any): Promise<AmadeusResponse>;
      };
    };

    // Ordering
    ordering: {
      transferOrders: {
        post(params: any): Promise<AmadeusResponse>;
      };
      transferOrder(orderId: string): {
        transfers: {
          cancellation: {
            post(): Promise<AmadeusResponse>;
          };
        };
      };
    };

    // Reference Data
    referenceData: {
      urls: {
        checkinLinks: {
          get(params: any): Promise<AmadeusResponse>;
        };
      };
      locations: {
        get(params: any): Promise<AmadeusResponse>;
        airports: {
          get(params: any): Promise<AmadeusResponse>;
        };
        cities: {
          get(params: any): Promise<AmadeusResponse>;
        };
        pointsOfInterest: {
          get(params: any): Promise<AmadeusResponse>;
          bySquare: {
            get(params: any): Promise<AmadeusResponse>;
          };
        };
        pointOfInterest(poiId: string): {
          get(): Promise<AmadeusResponse>;
        };
        hotels: {
          byCity: {
            get(params: any): Promise<AmadeusResponse>;
          };
          byGeocode: {
            get(params: any): Promise<AmadeusResponse>;
          };
          byHotels: {
            get(params: any): Promise<AmadeusResponse>;
          };
        };
      };
      location(locationId: string): {
        get(): Promise<AmadeusResponse>;
      };
      airlines: {
        get(params: any): Promise<AmadeusResponse>;
      };
      recommendedLocations: {
        get(params: any): Promise<AmadeusResponse>;
      };
    };

    // Travel
    travel: {
      analytics: {
        airTraffic: {
          booked: {
            get(params: any): Promise<AmadeusResponse>;
          };
          traveled: {
            get(params: any): Promise<AmadeusResponse>;
          };
          busiestPeriod: {
            get(params: any): Promise<AmadeusResponse>;
          };
        };
      };
      predictions: {
        tripPurpose: {
          get(params: any): Promise<AmadeusResponse>;
        };
        flightDelay: {
          get(params: any): Promise<AmadeusResponse>;
        };
      };
    };

    // Airport
    airport: {
      directDestinations: {
        get(params: any): Promise<AmadeusResponse>;
      };
      predictions: {
        onTime: {
          get(params: any): Promise<AmadeusResponse>;
        };
      };
    };

    // Airline
    airline: {
      destinations: {
        get(params: any): Promise<AmadeusResponse>;
      };
    };

    // Schedule
    schedule: {
      flights: {
        get(params: any): Promise<AmadeusResponse>;
      };
    };

    // Location
    location: {
      analytics: {
        categoryRatedAreas: {
          get(params: any): Promise<AmadeusResponse>;
        };
      };
    };

    // Analytics
    analytics: {
      itineraryPriceMetrics: {
        get(params: any): Promise<AmadeusResponse>;
      };
    };

    // eReputation
    eReputation: {
      hotelSentiments: {
        get(params: any): Promise<AmadeusResponse>;
      };
    };

    // Generic client methods
    client: {
      get(path: string, params?: any): Promise<AmadeusResponse>;
      post(path: string, params?: any): Promise<AmadeusResponse>;
    };

    // Pagination
    next(response: AmadeusResponse): Promise<AmadeusResponse>;
    previous(response: AmadeusResponse): Promise<AmadeusResponse>;
    first(response: AmadeusResponse): Promise<AmadeusResponse>;
    last(response: AmadeusResponse): Promise<AmadeusResponse>;
  }

  export default Amadeus;
}
