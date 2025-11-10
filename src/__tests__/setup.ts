// Test setup and utilities
export const mockAmadeusResponse = (data: any) => ({
  data,
  result: data,
});

export const mockAmadeusClient = () => ({
  shopping: {
    flightOffersSearch: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ flights: [] })),
      post: jest.fn().mockResolvedValue(mockAmadeusResponse({ flights: [] })),
    },
    flightDestinations: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ destinations: [] })),
    },
    flightDates: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ dates: [] })),
    },
    flightOffers: {
      pricing: {
        post: jest.fn().mockResolvedValue(mockAmadeusResponse({ price: {} })),
      },
      upselling: {
        post: jest.fn().mockResolvedValue(mockAmadeusResponse({ offers: [] })),
      },
      prediction: {
        post: jest.fn().mockResolvedValue(mockAmadeusResponse({ predictions: [] })),
      },
    },
    seatmaps: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ seatmaps: [] })),
      post: jest.fn().mockResolvedValue(mockAmadeusResponse({ seatmaps: [] })),
    },
    availability: {
      flightAvailabilities: {
        post: jest.fn().mockResolvedValue(mockAmadeusResponse({ availability: [] })),
      },
    },
    hotelOffersSearch: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ hotels: [] })),
    },
    hotelOfferSearch: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ offer: {} })),
    }),
    activities: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ activities: [] })),
      bySquare: {
        get: jest.fn().mockResolvedValue(mockAmadeusResponse({ activities: [] })),
      },
    },
    activity: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ activity: {} })),
    }),
    transferOffers: {
      post: jest.fn().mockResolvedValue(mockAmadeusResponse({ transfers: [] })),
    },
  },
  booking: {
    flightOrders: {
      post: jest.fn().mockResolvedValue(mockAmadeusResponse({ order: {} })),
    },
    flightOrder: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ order: {} })),
      delete: jest.fn().mockResolvedValue(mockAmadeusResponse({ success: true })),
    }),
    hotelBookings: {
      post: jest.fn().mockResolvedValue(mockAmadeusResponse({ booking: {} })),
    },
    hotelOrders: {
      post: jest.fn().mockResolvedValue(mockAmadeusResponse({ order: {} })),
    },
  },
  ordering: {
    transferOrders: {
      post: jest.fn().mockResolvedValue(mockAmadeusResponse({ order: {} })),
    },
    transferOrder: jest.fn().mockReturnValue({
      transfers: {
        cancellation: {
          post: jest.fn().mockResolvedValue(mockAmadeusResponse({ cancelled: true })),
        },
      },
    }),
  },
  referenceData: {
    urls: {
      checkinLinks: {
        get: jest.fn().mockResolvedValue(mockAmadeusResponse({ links: [] })),
      },
    },
    locations: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ locations: [] })),
      airports: {
        get: jest.fn().mockResolvedValue(mockAmadeusResponse({ airports: [] })),
      },
      cities: {
        get: jest.fn().mockResolvedValue(mockAmadeusResponse({ cities: [] })),
      },
      pointsOfInterest: {
        get: jest.fn().mockResolvedValue(mockAmadeusResponse({ pois: [] })),
        bySquare: {
          get: jest.fn().mockResolvedValue(mockAmadeusResponse({ pois: [] })),
        },
      },
      pointOfInterest: jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue(mockAmadeusResponse({ poi: {} })),
      }),
      hotels: {
        byCity: {
          get: jest.fn().mockResolvedValue(mockAmadeusResponse({ hotels: [] })),
        },
        byGeocode: {
          get: jest.fn().mockResolvedValue(mockAmadeusResponse({ hotels: [] })),
        },
        byHotels: {
          get: jest.fn().mockResolvedValue(mockAmadeusResponse({ hotels: [] })),
        },
      },
    },
    location: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ location: {} })),
    }),
    airlines: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ airlines: [] })),
    },
    recommendedLocations: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ locations: [] })),
    },
  },
  travel: {
    analytics: {
      airTraffic: {
        booked: {
          get: jest.fn().mockResolvedValue(mockAmadeusResponse({ data: [] })),
        },
        traveled: {
          get: jest.fn().mockResolvedValue(mockAmadeusResponse({ data: [] })),
        },
        busiestPeriod: {
          get: jest.fn().mockResolvedValue(mockAmadeusResponse({ data: [] })),
        },
      },
    },
    predictions: {
      tripPurpose: {
        get: jest.fn().mockResolvedValue(mockAmadeusResponse({ prediction: {} })),
      },
      flightDelay: {
        get: jest.fn().mockResolvedValue(mockAmadeusResponse({ prediction: {} })),
      },
    },
  },
  airport: {
    directDestinations: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ destinations: [] })),
    },
    predictions: {
      onTime: {
        get: jest.fn().mockResolvedValue(mockAmadeusResponse({ prediction: {} })),
      },
    },
  },
  airline: {
    destinations: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ destinations: [] })),
    },
  },
  schedule: {
    flights: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ flights: [] })),
    },
  },
  location: {
    analytics: {
      categoryRatedAreas: {
        get: jest.fn().mockResolvedValue(mockAmadeusResponse({ scores: [] })),
      },
    },
  },
  analytics: {
    itineraryPriceMetrics: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ metrics: {} })),
    },
  },
  eReputation: {
    hotelSentiments: {
      get: jest.fn().mockResolvedValue(mockAmadeusResponse({ sentiments: [] })),
    },
  },
});

// Mock environment variables
export const setupTestEnv = () => {
  process.env.AMADEUS_CLIENT_ID = 'test_client_id';
  process.env.AMADEUS_CLIENT_SECRET = 'test_client_secret';
  process.env.AMADEUS_HOSTNAME = 'test';
};

export const cleanupTestEnv = () => {
  delete process.env.AMADEUS_CLIENT_ID;
  delete process.env.AMADEUS_CLIENT_SECRET;
  delete process.env.AMADEUS_HOSTNAME;
};
