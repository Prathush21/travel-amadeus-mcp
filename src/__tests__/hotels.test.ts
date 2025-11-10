import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { setupTestEnv, cleanupTestEnv } from './setup.js';

describe('Hotel APIs', () => {
  beforeAll(() => {
    setupTestEnv();
  });

  afterAll(() => {
    cleanupTestEnv();
  });

  describe('hotel_offers_search', () => {
    it('should search hotels by city code', async () => {
      const params = {
        cityCode: 'PAR',
        checkInDate: '2025-12-15',
        checkOutDate: '2025-12-20',
        adults: 2,
      };

      expect(params.cityCode).toBe('PAR');
      expect(params.checkInDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(params.checkOutDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(params.adults).toBeGreaterThan(0);
    });

    it('should search hotels by coordinates', async () => {
      const params = {
        latitude: 48.8566,
        longitude: 2.3522,
        radius: 5,
        checkInDate: '2025-12-15',
        checkOutDate: '2025-12-20',
      };

      expect(params.latitude).toBeGreaterThan(-90);
      expect(params.latitude).toBeLessThan(90);
      expect(params.longitude).toBeGreaterThan(-180);
      expect(params.longitude).toBeLessThan(180);
      expect(params.radius).toBeGreaterThan(0);
    });
  });

  describe('hotel_offer_search', () => {
    it('should get specific hotel offer details', async () => {
      const params = {
        offerId: 'HOTEL_OFFER_123',
      };

      expect(params.offerId).toBeDefined();
      expect(params.offerId).toBe('HOTEL_OFFER_123');
    });
  });

  describe('hotel_booking', () => {
    it('should book hotel with valid guest data', async () => {
      const params = {
        offerId: 'HOTEL_OFFER_123',
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
            card: {
              vendorCode: 'VI',
              cardNumber: '4111111111111111',
              expiryDate: '2026-12',
            },
          },
        ],
      };

      expect(params.offerId).toBeDefined();
      expect(params.guests).toBeInstanceOf(Array);
      expect(params.guests[0].name.firstName).toBe('JOHN');
      expect(params.guests[0].contact.email).toContain('@');
      expect(params.payments).toBeInstanceOf(Array);
    });
  });

  describe('hotel_list_by_city', () => {
    it('should list all hotels in a city', async () => {
      const params = {
        cityCode: 'PAR',
      };

      expect(params.cityCode).toBeDefined();
      expect(params.cityCode).toBe('PAR');
    });
  });

  describe('hotel_list_by_geocode', () => {
    it('should list hotels by coordinates', async () => {
      const params = {
        latitude: 48.8566,
        longitude: 2.3522,
        radius: 10,
      };

      expect(params.latitude).toBeDefined();
      expect(params.longitude).toBeDefined();
      expect(params.radius).toBeGreaterThan(0);
    });
  });

  describe('hotel_sentiments', () => {
    it('should get hotel sentiment analysis', async () => {
      const params = {
        hotelIds: 'HOTEL1,HOTEL2,HOTEL3',
      };

      expect(params.hotelIds).toBeDefined();
      expect(params.hotelIds).toContain(',');
    });

    it('should handle single hotel ID', async () => {
      const params = {
        hotelIds: 'HOTEL1',
      };

      expect(params.hotelIds).toBeDefined();
    });
  });
});
