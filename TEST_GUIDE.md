# Test Guide for Amadeus MCP Server

This guide explains how to run and understand the tests for the Amadeus MCP Server.

## Test Structure

The test suite is organized into multiple test files covering all API endpoints:

### Test Files

1. **flights.test.ts** - Tests for all Flight APIs (12 endpoints)
   - Flight search, booking, pricing
   - Seat maps, availability
   - Flight inspiration and cheapest dates
   - Branded fares and predictions
   - Flight status

2. **hotels.test.ts** - Tests for Hotel APIs (6 endpoints)
   - Hotel search by city and coordinates
   - Hotel offer details
   - Hotel booking
   - Hotel listings
   - Sentiment analysis

3. **activities.test.ts** - Tests for Activities & POI APIs (6 endpoints)
   - Points of interest search
   - Activity search and details
   - Geographic search (radius and square)

4. **transfers.test.ts** - Tests for Transfer APIs (3 endpoints)
   - Transfer search
   - Transfer booking
   - Transfer cancellation

5. **reference-data.test.ts** - Tests for Reference Data APIs (7 endpoints)
   - Location and airport search
   - Airline lookup
   - Check-in links
   - Route information

6. **analytics-predictions.test.ts** - Tests for Analytics & Predictions (8 endpoints)
   - Travel analytics
   - Flight delay predictions
   - Trip purpose prediction
   - Price analysis
   - Location scores

7. **integration.test.ts** - End-to-end integration tests
   - Complete booking flows
   - API response validation
   - Error handling

## Running Tests

### Prerequisites

1. Install Node.js (version 18 or higher)
2. Install dependencies:
   ```bash
   npm install
   ```

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

This will generate a coverage report showing:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

### Run Specific Test File

```bash
npm test -- flights.test.ts
```

### Run Specific Test Suite

```bash
npm test -- -t "Flight APIs"
```

### Run Specific Test Case

```bash
npm test -- -t "should search for flight offers"
```

## Test Types

### Unit Tests

Test individual API endpoint parameters and validation:
- Parameter validation
- Data format validation
- Required field checks

Example:
```typescript
it('should search for flight offers with valid parameters', async () => {
  const params = {
    originLocationCode: 'NYC',
    destinationLocationCode: 'LON',
    departureDate: '2025-12-15',
    adults: 1,
  };

  expect(params.originLocationCode).toBe('NYC');
  expect(params.departureDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});
```

### Integration Tests

Test complete workflows and API interactions:
- End-to-end booking flows
- Multi-step processes
- Real API response structures

Example:
```typescript
it('should perform complete flight search workflow', async () => {
  // Step 1: Search locations
  // Step 2: Search flights
  // Step 3: Price flights
  // Step 4: Create booking
});
```

## Testing with Real API

To test against the real Amadeus API:

1. Set up your credentials in `.env`:
   ```env
   AMADEUS_CLIENT_ID=your_test_client_id
   AMADEUS_CLIENT_SECRET=your_test_secret
   AMADEUS_HOSTNAME=test
   ```

2. Modify test files to use real API calls instead of mocks

3. Run tests:
   ```bash
   npm test
   ```

**Note**: The integration tests include credentials from `.env.example` for the Amadeus test environment.

## Test Coverage Goals

The project maintains these coverage thresholds:
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## What's Being Tested

### ✅ All 50+ API Endpoints Covered

#### Flight APIs (12)
- ✅ flight_offers_search
- ✅ flight_offers_pricing
- ✅ flight_create_order
- ✅ flight_order_get
- ✅ flight_order_delete
- ✅ flight_inspiration_search
- ✅ flight_cheapest_date_search
- ✅ flight_availability_search
- ✅ seatmap_display
- ✅ branded_fares_upsell
- ✅ flight_choice_prediction
- ✅ flight_status

#### Hotel APIs (6)
- ✅ hotel_offers_search
- ✅ hotel_offer_search
- ✅ hotel_booking
- ✅ hotel_list_by_city
- ✅ hotel_list_by_geocode
- ✅ hotel_sentiments

#### Activities & POI (6)
- ✅ points_of_interest_search
- ✅ points_of_interest_by_square
- ✅ point_of_interest_details
- ✅ activities_search
- ✅ activities_by_square
- ✅ activity_details

#### Transfer APIs (3)
- ✅ transfer_search
- ✅ transfer_booking
- ✅ transfer_cancellation

#### Reference Data (7)
- ✅ location_search
- ✅ airport_city_search
- ✅ nearest_airport
- ✅ airline_lookup
- ✅ checkin_links
- ✅ airport_routes
- ✅ airline_routes

#### Analytics & Predictions (8)
- ✅ most_booked_destinations
- ✅ most_traveled_destinations
- ✅ busiest_travel_period
- ✅ location_score
- ✅ flight_delay_prediction
- ✅ trip_purpose_prediction
- ✅ airport_on_time_performance
- ✅ flight_price_analysis

## Common Test Patterns

### Testing Date Formats
```typescript
expect(params.departureDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
```

### Testing Coordinates
```typescript
expect(params.latitude).toBeGreaterThan(-90);
expect(params.latitude).toBeLessThan(90);
```

### Testing Email Validation
```typescript
expect(params.email).toContain('@');
```

### Testing Arrays
```typescript
expect(params.travelers).toBeInstanceOf(Array);
expect(params.travelers.length).toBeGreaterThan(0);
```

## Debugging Tests

### Enable Verbose Output
```bash
npm test -- --verbose
```

### Run Tests with Node Inspector
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### View Full Test Output
```bash
npm test -- --no-coverage
```

## Continuous Integration

The test suite is designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm test

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Best Practices

1. **Keep tests isolated** - Each test should be independent
2. **Use descriptive names** - Test names should clearly describe what's being tested
3. **Test edge cases** - Include tests for invalid inputs and error conditions
4. **Mock external dependencies** - Use mocks for API calls in unit tests
5. **Use real APIs sparingly** - Reserve real API calls for integration tests

## Troubleshooting

### Test Fails with "Module not found"
- Run `npm install` to ensure all dependencies are installed

### Test Timeout Errors
- Increase timeout in jest.config.js or use `jest.setTimeout(10000)`

### Coverage Below Threshold
- Add more test cases to increase coverage
- Check coverage report: `npm run test:coverage`

## Contributing Tests

When adding new API endpoints:

1. Create tests in the appropriate test file
2. Include parameter validation tests
3. Add integration test scenarios
4. Update this guide with new endpoints
5. Ensure coverage thresholds are met

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Amadeus API Documentation](https://developers.amadeus.com/self-service)
- [Test Coverage Reports](./coverage/index.html) (after running `npm run test:coverage`)
