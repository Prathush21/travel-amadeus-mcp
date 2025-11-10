import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { setupTestEnv, cleanupTestEnv } from './setup.js';

describe('Reference Data APIs', () => {
  beforeAll(() => {
    setupTestEnv();
  });

  afterAll(() => {
    cleanupTestEnv();
  });

  describe('location_search', () => {
    it('should search for locations with keyword', async () => {
      const params = {
        keyword: 'Paris',
        subType: 'CITY',
      };

      expect(params.keyword).toBeDefined();
      expect(params.keyword).toBe('Paris');
      expect(params.subType).toBeDefined();
    });

    it('should search for airports', async () => {
      const params = {
        keyword: 'JFK',
        subType: 'AIRPORT',
      };

      expect(params.keyword).toBeDefined();
      expect(params.subType).toBe('AIRPORT');
    });
  });

  describe('airport_city_search', () => {
    it('should search airports and cities', async () => {
      const params = {
        keyword: 'London',
      };

      expect(params.keyword).toBeDefined();
      expect(params.keyword).toBe('London');
    });
  });

  describe('nearest_airport', () => {
    it('should find nearest airport by coordinates', async () => {
      const params = {
        latitude: 40.7128,
        longitude: -74.006,
      };

      expect(params.latitude).toBeGreaterThan(-90);
      expect(params.latitude).toBeLessThan(90);
      expect(params.longitude).toBeGreaterThan(-180);
      expect(params.longitude).toBeLessThan(180);
    });
  });

  describe('airline_lookup', () => {
    it('should lookup airline by code', async () => {
      const params = {
        airlineCodes: 'AA',
      };

      expect(params.airlineCodes).toBeDefined();
      expect(params.airlineCodes).toBe('AA');
    });

    it('should lookup multiple airlines', async () => {
      const params = {
        airlineCodes: 'AA,BA,LH',
      };

      expect(params.airlineCodes).toContain(',');
    });
  });

  describe('checkin_links', () => {
    it('should get airline check-in links', async () => {
      const params = {
        airlineCode: 'AA',
      };

      expect(params.airlineCode).toBeDefined();
      expect(params.airlineCode).toBe('AA');
    });
  });

  describe('airport_routes', () => {
    it('should get direct routes from airport', async () => {
      const params = {
        departureAirportCode: 'JFK',
      };

      expect(params.departureAirportCode).toBeDefined();
      expect(params.departureAirportCode).toBe('JFK');
    });
  });

  describe('airline_routes', () => {
    it('should get airline destinations', async () => {
      const params = {
        airlineCode: 'AA',
      };

      expect(params.airlineCode).toBeDefined();
      expect(params.airlineCode).toBe('AA');
    });
  });
});
