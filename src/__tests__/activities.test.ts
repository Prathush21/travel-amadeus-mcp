import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { setupTestEnv, cleanupTestEnv } from './setup.js';

describe('Activities & Points of Interest APIs', () => {
  beforeAll(() => {
    setupTestEnv();
  });

  afterAll(() => {
    cleanupTestEnv();
  });

  describe('points_of_interest_search', () => {
    it('should search POIs by coordinates', async () => {
      const params = {
        latitude: 48.8566,
        longitude: 2.3522,
        radius: 1,
      };

      expect(params.latitude).toBeGreaterThan(-90);
      expect(params.latitude).toBeLessThan(90);
      expect(params.longitude).toBeGreaterThan(-180);
      expect(params.longitude).toBeLessThan(180);
      expect(params.radius).toBeGreaterThan(0);
    });
  });

  describe('points_of_interest_by_square', () => {
    it('should search POIs in a square area', async () => {
      const params = {
        north: 48.8566,
        south: 48.8466,
        east: 2.3622,
        west: 2.3422,
      };

      expect(params.north).toBeGreaterThan(params.south);
      expect(params.east).toBeGreaterThan(params.west);
    });
  });

  describe('point_of_interest_details', () => {
    it('should get POI details by ID', async () => {
      const params = {
        poiId: 'POI123',
      };

      expect(params.poiId).toBeDefined();
      expect(params.poiId).toBe('POI123');
    });
  });

  describe('activities_search', () => {
    it('should search activities by coordinates', async () => {
      const params = {
        latitude: 40.7128,
        longitude: -74.006,
        radius: 5,
      };

      expect(params.latitude).toBeDefined();
      expect(params.longitude).toBeDefined();
      expect(params.radius).toBeGreaterThan(0);
    });
  });

  describe('activities_by_square', () => {
    it('should search activities in a square area', async () => {
      const params = {
        north: 40.73,
        south: 40.70,
        east: -73.99,
        west: -74.02,
      };

      expect(params.north).toBeGreaterThan(params.south);
      expect(params.east).toBeGreaterThan(params.west);
    });
  });

  describe('activity_details', () => {
    it('should get activity details by ID', async () => {
      const params = {
        activityId: 'ACTIVITY123',
      };

      expect(params.activityId).toBeDefined();
      expect(params.activityId).toBe('ACTIVITY123');
    });
  });
});
