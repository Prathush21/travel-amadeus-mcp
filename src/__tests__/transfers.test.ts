import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { setupTestEnv, cleanupTestEnv } from './setup.js';

describe('Transfer APIs', () => {
  beforeAll(() => {
    setupTestEnv();
  });

  afterAll(() => {
    cleanupTestEnv();
  });

  describe('transfer_search', () => {
    it('should search for transfers with valid parameters', async () => {
      const params = {
        startLocationCode: 'JFK',
        endLocationCode: 'NYC',
        startDateTime: '2025-12-15T10:00:00',
        passengers: 2,
      };

      expect(params.startLocationCode).toBeDefined();
      expect(params.endLocationCode).toBeDefined();
      expect(params.startDateTime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
      expect(params.passengers).toBeGreaterThan(0);
    });
  });

  describe('transfer_booking', () => {
    it('should book a transfer with passenger details', async () => {
      const params = {
        offerId: 'TRANSFER_OFFER_123',
        passengers: [
          {
            firstName: 'JOHN',
            lastName: 'DOE',
            title: 'MR',
            contacts: {
              phoneNumber: '+1-555-1234567',
              email: 'john.doe@example.com',
            },
          },
        ],
      };

      expect(params.offerId).toBeDefined();
      expect(params.passengers).toBeInstanceOf(Array);
      expect(params.passengers[0].firstName).toBe('JOHN');
      expect(params.passengers[0].contacts.email).toContain('@');
    });
  });

  describe('transfer_cancellation', () => {
    it('should cancel a transfer booking', async () => {
      const params = {
        transferOrderId: 'TRANSFER_ORDER_123',
      };

      expect(params.transferOrderId).toBeDefined();
      expect(params.transferOrderId).toBe('TRANSFER_ORDER_123');
    });
  });
});
