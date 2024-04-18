const { FifoQueue } = require('./queue');

describe('FifoQueue', () => {
  let queue;

  beforeEach(() => {
    queue = new FifoQueue('fifo');
  });

  it('should add and retrieve items in FIFO order', () => {
    queue.add('first');
    queue.add('second');
    queue.add('third');

    expect(queue.getNext()).toBe('first');
    expect(queue.getNext()).toBe('second');
    expect(queue.getNext()).toBe('third');
  });

  it('should peek at the next item without removing it from the queue', () => {
    queue.add('first');
    queue.add('second');
    queue.add('third');

    expect(queue.peek()).toBe('first');
    expect(queue.getNext()).toBe('first');
  });

  it('should return undefined when trying to retrieve from an empty queue', () => {
    expect(queue.getNext()).toBeUndefined();
  });

  it('should return undefined when trying to peek at an empty queue', () => {
    expect(queue.peek()).toBeUndefined();
  });
});