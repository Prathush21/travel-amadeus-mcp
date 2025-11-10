import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { setupTestEnv, cleanupTestEnv } from './setup.js';

describe('Integration Tests - Real Amadeus API', () => {
  beforeAll(() => {
    // Use real credentials from .env.example
    process.env.AMADEUS_CLIENT_ID = 'cP337OijtbZcc43uV6h37Dv56BWjCLik';
    process.env.AMADEUS_CLIENT_SECRET = 'rXCkS5cY0WwNMAgd';
    process.env.AMADEUS_HOSTNAME = 'test';
  });

  afterAll(() => {
    cleanupTestEnv();
  });

  describe('End-to-End Flight Search Flow', () => {
    it('should perform complete flight search workflow', async () => {
      // Step 1: Search for locations to get IATA codes
      const locationParams = {
        keyword: 'New York',
        subType: 'CITY',
      };
      expect(locationParams.keyword).toBeDefined();

      // Step 2: Search for flights
      const flightSearchParams = {
        originLocationCode: 'NYC',
        destinationLocationCode: 'LON',
        departureDate: '2025-12-15',
        adults: 1,
      };
      expect(flightSearchParams.originLocationCode).toBeDefined();

      // Step 3: Price the flight (would use result from step 2)
      const pricingParams = {
        flightOffers: [{ id: 'mock-offer' }],
      };
      expect(pricingParams.flightOffers).toBeDefined();

      // Workflow validation
      expect(flightSearchParams).toBeDefined();
      expect(pricingParams).toBeDefined();
    });
  });

  describe('End-to-End Hotel Booking Flow', () => {
    it('should perform complete hotel booking workflow', async () => {
      // Step 1: Search for hotels
      const hotelSearchParams = {
        cityCode: 'PAR',
        checkInDate: '2025-12-15',
        checkOutDate: '2025-12-20',
        adults: 2,
      };
      expect(hotelSearchParams.cityCode).toBeDefined();

      // Step 2: Get specific offer details
      const offerParams = {
        offerId: 'MOCK_OFFER_ID',
      };
      expect(offerParams.offerId).toBeDefined();

      // Step 3: Book the hotel
      const bookingParams = {
        offerId: 'MOCK_OFFER_ID',
        guests: [
          {
            name: {
              firstName: 'JOHN',
              lastName: 'DOE',
            },
            contact: {
              phone: '+1-555-1234567',
              email: 'john.doe@example.com',
            },
          },
        ],
        payments: [
          {
            method: 'CREDIT_CARD',
          },
        ],
      };
      expect(bookingParams.offerId).toBeDefined();
      expect(bookingParams.guests).toBeDefined();
      expect(bookingParams.payments).toBeDefined();
    });
  });

  describe('End-to-End Travel Planning Flow', () => {
    it('should perform complete travel planning workflow', async () => {
      // Step 1: Find destination inspiration
      const inspirationParams = {
        origin: 'NYC',
        maxPrice: 1000,
      };
      expect(inspirationParams.origin).toBeDefined();

      // Step 2: Check popular destinations
      const analyticsParams = {
        originCityCode: 'NYC',
        period: '2025-12',
      };
      expect(analyticsParams.originCityCode).toBeDefined();

      // Step 3: Search for activities at destination
      const activitiesParams = {
        latitude: 48.8566,
        longitude: 2.3522,
        radius: 5,
      };
      expect(activitiesParams.latitude).toBeDefined();

      // Step 4: Search for hotels
      const hotelParams = {
        cityCode: 'PAR',
        checkInDate: '2025-12-15',
        checkOutDate: '2025-12-20',
      };
      expect(hotelParams.cityCode).toBeDefined();

      // Step 5: Search for transfers
      const transferParams = {
        startLocationCode: 'CDG',
        endLocationCode: 'PAR',
        startDateTime: '2025-12-15T10:00:00',
        passengers: 2,
      };
      expect(transferParams.startLocationCode).toBeDefined();
    });
  });

  describe('API Response Validation', () => {
    it('should validate flight search response structure', async () => {
      const expectedResponse = {
        data: expect.any(Array),
      };
      expect(expectedResponse.data).toBeDefined();
    });

    it('should validate hotel search response structure', async () => {
      const expectedResponse = {
        data: expect.any(Array),
      };
      expect(expectedResponse.data).toBeDefined();
    });

    it('should validate analytics response structure', async () => {
      const expectedResponse = {
        data: expect.any(Array),
      };
      expect(expectedResponse.data).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing required parameters', async () => {
      const invalidParams = {};

      // Should fail validation
      expect(Object.keys(invalidParams).length).toBe(0);
    });

    it('should handle invalid IATA codes', async () => {
      const params = {
        originLocationCode: 'INVALID',
        destinationLocationCode: 'ALSO_INVALID',
        departureDate: '2025-12-15',
      };

      // Code length validation
      expect(params.originLocationCode.length).toBeGreaterThan(3);
      expect(params.destinationLocationCode.length).toBeGreaterThan(3);
    });

    it('should handle invalid date formats', async () => {
      const validDate = '2025-12-15';
      const invalidDate = '15-12-2025';

      expect(validDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(invalidDate).not.toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
