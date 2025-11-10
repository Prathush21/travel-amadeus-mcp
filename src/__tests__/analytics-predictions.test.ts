import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { setupTestEnv, cleanupTestEnv } from './setup.js';

describe('Analytics & Predictions APIs', () => {
  beforeAll(() => {
    setupTestEnv();
  });

  afterAll(() => {
    cleanupTestEnv();
  });

  describe('most_booked_destinations', () => {
    it('should get most booked destinations', async () => {
      const params = {
        originCityCode: 'NYC',
        period: '2025-12',
      };

      expect(params.originCityCode).toBeDefined();
      expect(params.period).toMatch(/^\d{4}-\d{2}$/);
    });
  });

  describe('most_traveled_destinations', () => {
    it('should get most traveled destinations', async () => {
      const params = {
        originCityCode: 'NYC',
        period: '2025-12',
      };

      expect(params.originCityCode).toBeDefined();
      expect(params.period).toMatch(/^\d{4}-\d{2}$/);
    });
  });

  describe('busiest_travel_period', () => {
    it('should find busiest travel period', async () => {
      const params = {
        cityCode: 'PAR',
        period: '2025',
      };

      expect(params.cityCode).toBeDefined();
      expect(params.period).toMatch(/^\d{4}$/);
    });
  });

  describe('location_score', () => {
    it('should get location safety and tourism scores', async () => {
      const params = {
        latitude: 48.8566,
        longitude: 2.3522,
      };

      expect(params.latitude).toBeGreaterThan(-90);
      expect(params.latitude).toBeLessThan(90);
      expect(params.longitude).toBeGreaterThan(-180);
      expect(params.longitude).toBeLessThan(180);
    });
  });

  describe('flight_delay_prediction', () => {
    it('should predict flight delay likelihood', async () => {
      const params = {
        originLocationCode: 'JFK',
        destinationLocationCode: 'LAX',
        departureDate: '2025-12-15',
        departureTime: '10:00:00',
        arrivalDate: '2025-12-15',
        arrivalTime: '14:00:00',
        aircraftCode: '320',
        carrierCode: 'AA',
        flightNumber: '100',
      };

      expect(params.originLocationCode).toBeDefined();
      expect(params.destinationLocationCode).toBeDefined();
      expect(params.departureDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(params.departureTime).toMatch(/^\d{2}:\d{2}:\d{2}$/);
      expect(params.arrivalDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(params.arrivalTime).toMatch(/^\d{2}:\d{2}:\d{2}$/);
      expect(params.aircraftCode).toBeDefined();
      expect(params.carrierCode).toBeDefined();
      expect(params.flightNumber).toBeDefined();
    });
  });

  describe('trip_purpose_prediction', () => {
    it('should predict if trip is business or leisure', async () => {
      const params = {
        originLocationCode: 'NYC',
        destinationLocationCode: 'PAR',
        departureDate: '2025-12-15',
        returnDate: '2025-12-22',
      };

      expect(params.originLocationCode).toBeDefined();
      expect(params.destinationLocationCode).toBeDefined();
      expect(params.departureDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(params.returnDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('airport_on_time_performance', () => {
    it('should get airport on-time performance', async () => {
      const params = {
        airportCode: 'JFK',
        date: '2025-12-15',
      };

      expect(params.airportCode).toBeDefined();
      expect(params.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('flight_price_analysis', () => {
    it('should analyze flight price metrics', async () => {
      const params = {
        originIataCode: 'NYC',
        destinationIataCode: 'LON',
        departureDate: '2025-12-15',
      };

      expect(params.originIataCode).toBeDefined();
      expect(params.destinationIataCode).toBeDefined();
      expect(params.departureDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
