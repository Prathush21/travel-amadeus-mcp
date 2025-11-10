# Travel Amadeus MCP Server

A Model Context Protocol (MCP) server that provides access to all Amadeus Travel APIs. This allows AI assistants to search flights, book hotels, find activities, and access comprehensive travel data.

## Features

### Flight APIs
- **Flight Search** - Search for flight offers with flexible dates and routes
- **Flight Booking** - Create, retrieve, and cancel flight orders
- **Flight Inspiration** - Find cheapest destinations from origin
- **Flight Availability** - Advanced availability search
- **Seat Maps** - View available seats on flights
- **Branded Fares** - Get upsell options with additional services
- **Flight Status** - Real-time flight tracking

### Hotel APIs
- **Hotel Search** - Find hotel offers by city or coordinates
- **Hotel Booking** - Book hotel rooms
- **Hotel Listings** - List hotels by city or location
- **Hotel Sentiments** - Get review sentiment analysis

### Activities & Points of Interest
- **Activities Search** - Find tours and activities by location
- **Points of Interest** - Discover tourist attractions
- **Activity Details** - Get detailed activity information

### Transfer Services
- **Transfer Search** - Find private transfer options
- **Transfer Booking** - Book ground transportation
- **Transfer Cancellation** - Cancel transfer bookings

### Travel Intelligence
- **Travel Analytics** - Most booked/traveled destinations, busiest periods
- **Price Analysis** - Flight price metrics and quartile distributions
- **Predictions** - Flight delay, trip purpose, on-time performance
- **Location Scores** - Safety and tourism ratings

### Reference Data
- **Location Search** - Find airports and cities (autocomplete)
- **Airline Lookup** - Get airline information
- **Check-in Links** - Airline check-in URLs
- **Route Information** - Airport and airline routes

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd travel-amadeus-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Get your Amadeus API credentials:
   - Sign up at [Amadeus for Developers](https://developers.amadeus.com/)
   - Create a new app to get your API Key (Client ID) and API Secret (Client Secret)

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your credentials
```

5. Build the project:
```bash
npm run build
```

## Configuration

### Environment Variables

Create a `.env` file with the following:

```env
AMADEUS_CLIENT_ID=your_client_id_here
AMADEUS_CLIENT_SECRET=your_client_secret_here
AMADEUS_HOSTNAME=production  # or "test" for testing
```

### Claude Desktop Configuration

Add to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "amadeus": {
      "command": "node",
      "args": ["/absolute/path/to/travel-amadeus-mcp/dist/index.js"],
      "env": {
        "AMADEUS_CLIENT_ID": "your_client_id",
        "AMADEUS_CLIENT_SECRET": "your_client_secret",
        "AMADEUS_HOSTNAME": "production"
      }
    }
  }
}
```

## Usage

Once configured, the MCP server provides 50+ tools to Claude. Here are some example prompts:

### Flight Search
```
Find me flights from New York to London departing on 2025-12-15
```

### Hotel Search
```
Show me hotels in Paris for check-in on 2025-12-20 and check-out on 2025-12-23
```

### Activities
```
What are the top tourist attractions near the Eiffel Tower?
```

### Travel Insights
```
What are the most popular destinations from San Francisco this month?
```

### Flight Status
```
What's the status of flight AA100 on 2025-11-15?
```

## Available Tools

The server provides 50+ MCP tools organized by category:

### Flight Tools (12)
- `flight_offers_search` - Search flight offers
- `flight_offers_pricing` - Confirm pricing
- `flight_create_order` - Book flights
- `flight_order_get` - Get booking details
- `flight_order_delete` - Cancel bookings
- `flight_inspiration_search` - Find cheap destinations
- `flight_cheapest_date_search` - Find cheapest dates
- `flight_availability_search` - Advanced search
- `seatmap_display` - View seat maps
- `branded_fares_upsell` - Get fare upgrades
- `flight_choice_prediction` - Predict preferences
- `flight_status` - Real-time status

### Hotel Tools (6)
- `hotel_offers_search` - Search hotels
- `hotel_offer_search` - Get offer details
- `hotel_booking` - Book hotels
- `hotel_list_by_city` - List hotels by city
- `hotel_list_by_geocode` - List hotels by location
- `hotel_sentiments` - Review analysis

### Activity Tools (6)
- `points_of_interest_search` - Find POIs
- `points_of_interest_by_square` - POIs in area
- `point_of_interest_details` - POI details
- `activities_search` - Find activities
- `activities_by_square` - Activities in area
- `activity_details` - Activity details

### Transfer Tools (3)
- `transfer_search` - Search transfers
- `transfer_booking` - Book transfers
- `transfer_cancellation` - Cancel transfers

### Reference Data Tools (7)
- `location_search` - Search locations
- `airport_city_search` - Find airports/cities
- `nearest_airport` - Find nearest airport
- `airline_lookup` - Airline information
- `checkin_links` - Check-in URLs
- `airport_routes` - Airport routes
- `airline_routes` - Airline routes

### Analytics Tools (4)
- `most_booked_destinations` - Popular destinations
- `most_traveled_destinations` - Travel trends
- `busiest_travel_period` - Peak periods
- `location_score` - Location ratings

### Prediction Tools (4)
- `flight_delay_prediction` - Delay likelihood
- `trip_purpose_prediction` - Business vs leisure
- `airport_on_time_performance` - On-time stats
- `flight_price_analysis` - Price metrics

## Development

### Build
```bash
npm run build
```

### Watch Mode
```bash
npm run watch
```

### Run Directly
```bash
npm run dev
```

## API Documentation

For detailed API documentation, visit:
- [Amadeus Self-Service APIs](https://developers.amadeus.com/self-service)
- [API Reference](https://developers.amadeus.com/self-service/apis-docs)

## Test vs Production

Amadeus provides two environments:

- **Test Environment**: Use test credentials for development with sample data
- **Production Environment**: Use production credentials for real bookings (charges apply)

Set `AMADEUS_HOSTNAME=test` for testing or `AMADEUS_HOSTNAME=production` for live data.

## Limitations

- Some APIs require production credentials
- Booking APIs may incur charges
- Rate limits apply based on your Amadeus account tier
- Some endpoints require specific data formats (see Amadeus documentation)

## Security Notes

- Never commit your `.env` file or credentials
- Use environment variables for sensitive data
- For production use, implement proper credential management
- Review Amadeus terms of service and API usage policies

## License

MIT

## Support

- [Amadeus Developer Portal](https://developers.amadeus.com/)
- [Amadeus Support](https://developers.amadeus.com/support)
- [MCP Documentation](https://modelcontextprotocol.io/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
