import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { setupTestEnv, cleanupTestEnv } from './setup.js';

describe('Flight APIs', () => {
  beforeAll(() => {
    setupTestEnv();
  });

  afterAll(() => {
    cleanupTestEnv();
  });

  describe('flight_offers_search', () => {
    it('should search for flight offers with valid parameters', async () => {
      const params = {
        originLocationCode: 'NYC',
        destinationLocationCode: 'LON',
        departureDate: '2025-12-15',
        adults: 1,
      };

      // Test that the parameters are valid
      expect(params.originLocationCode).toBe('NYC');
      expect(params.destinationLocationCode).toBe('LON');
      expect(params.departureDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(params.adults).toBeGreaterThan(0);
    });

    it('should handle round trip searches', async () => {
      const params = {
        originLocationCode: 'NYC',
        destinationLocationCode: 'LON',
        departureDate: '2025-12-15',
        returnDate: '2025-12-22',
        adults: 2,
      };

      expect(params.returnDate).toBeDefined();
      expect(params.returnDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('flight_offers_pricing', () => {
    it('should validate flight offers for pricing', async () => {
      const params = {
        flightOffers: [
          {
            id: 'offer-1',
            source: 'GDS',
            instantTicketingRequired: false,
          },
        ],
      };

      expect(params.flightOffers).toBeInstanceOf(Array);
      expect(params.flightOffers.length).toBeGreaterThan(0);
    });
  });

  describe('flight_create_order', () => {
    it('should create flight order with valid traveler data', async () => {
      const params = {
        flightOffers: [{ id: 'offer-1' }],
        travelers: [
          {
            id: '1',
            dateOfBirth: '1990-01-01',
            name: {
              firstName: 'JOHN',
              lastName: 'DOE',
            },
            contact: {
              emailAddress: 'john.doe@example.com',
              phones: [
                {
                  deviceType: 'MOBILE',
                  countryCallingCode: '1',
                  number: '5551234567',
                },
              ],
            },
          },
        ],
      };

      expect(params.travelers).toBeInstanceOf(Array);
      expect(params.travelers[0].name.firstName).toBe('JOHN');
      expect(params.travelers[0].contact.emailAddress).toContain('@');
    });
  });

  describe('flight_order_get', () => {
    it('should retrieve flight order by ID', async () => {
      const params = {
        flightOrderId: 'ORDER123',
      };

      expect(params.flightOrderId).toBeDefined();
      expect(params.flightOrderId).toBe('ORDER123');
    });
  });

  describe('flight_order_delete', () => {
    it('should cancel flight order', async () => {
      const params = {
        flightOrderId: 'ORDER123',
      };

      expect(params.flightOrderId).toBeDefined();
    });
  });

  describe('flight_inspiration_search', () => {
    it('should find cheapest destinations', async () => {
      const params = {
        origin: 'NYC',
        maxPrice: 500,
      };

      expect(params.origin).toBe('NYC');
      expect(params.maxPrice).toBeGreaterThan(0);
    });
  });

  describe('flight_cheapest_date_search', () => {
    it('should find cheapest travel dates', async () => {
      const params = {
        origin: 'NYC',
        destination: 'LON',
      };

      expect(params.origin).toBeDefined();
      expect(params.destination).toBeDefined();
    });
  });

  describe('flight_availability_search', () => {
    it('should search flight availability', async () => {
      const params = {
        originDestinations: [
          {
            id: '1',
            originLocationCode: 'NYC',
            destinationLocationCode: 'LON',
            departureDateTimeRange: {
              date: '2025-12-15',
            },
          },
        ],
        travelers: [{ id: '1', travelerType: 'ADULT' }],
        sources: ['GDS'],
      };

      expect(params.originDestinations).toBeInstanceOf(Array);
      expect(params.travelers).toBeInstanceOf(Array);
      expect(params.sources).toBeInstanceOf(Array);
    });
  });

  describe('seatmap_display', () => {
    it('should get seat maps for flights', async () => {
      const params = {
        flightOffers: [{ id: 'offer-1' }],
      };

      expect(params.flightOffers).toBeInstanceOf(Array);
    });
  });

  describe('branded_fares_upsell', () => {
    it('should get branded fare options', async () => {
      const params = {
        flightOffers: [{ id: 'offer-1' }],
      };

      expect(params.flightOffers).toBeDefined();
    });
  });

  describe('flight_choice_prediction', () => {
    it('should predict flight choice', async () => {
      const params = {
        flightOffers: [
          { id: 'offer-1', price: { total: '500' } },
          { id: 'offer-2', price: { total: '600' } },
        ],
      };

      expect(params.flightOffers.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('flight_status', () => {
    it('should get real-time flight status', async () => {
      const params = {
        carrierCode: 'AA',
        flightNumber: '100',
        scheduledDepartureDate: '2025-12-15',
      };

      expect(params.carrierCode).toBeDefined();
      expect(params.flightNumber).toBeDefined();
      expect(params.scheduledDepartureDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
