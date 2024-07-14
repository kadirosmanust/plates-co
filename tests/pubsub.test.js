import { subscribe, publish } from '../src/pubsub';

describe('PubSub Tests', () => {
  const events = {};
  beforeEach(() => {
    // Reset the events
    Object.keys(events).forEach(key => {
      delete events[key];
    });
  });

  test('should subscribe and publish events correctly', () => {
    const mockCallback = jest.fn();
    subscribe('EVENT_TEST', mockCallback, events);

    publish('EVENT_TEST', { test: 'data' }, events);
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledWith({ test: 'data' });
  });

  test('should not call callback if event is not published', () => {
    const mockCallback = jest.fn();
    subscribe('EVENT_TEST', mockCallback, events);

    publish('EVENT_OTHER', { test: 'data' }, events);
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
