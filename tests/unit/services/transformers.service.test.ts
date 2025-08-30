import { TransformersService } from '@/services/transformers.service';

describe('TransformersService', () => {
  let service: TransformersService;

  beforeEach(() => {
    service = new TransformersService();
  });

  describe('getRandomNames', () => {
    it('should return the correct number of random names', () => {
      const count = 5;
      const result = service.getRandomNames(count);

      expect(result.names).toHaveLength(count);
      expect(result.total).toBe(count);
      expect(Array.isArray(result.names)).toBe(true);
    });

    it('should return different names on multiple calls', () => {
      const result1 = service.getRandomNames(10);
      const result2 = service.getRandomNames(10);

      // While theoretically possible to get the same names, it's highly unlikely
      expect(result1.names).not.toEqual(result2.names);
    });

    it('should throw error for invalid count', () => {
      expect(() => service.getRandomNames(0)).toThrow('Count must be between 1 and 100');
      expect(() => service.getRandomNames(-1)).toThrow('Count must be between 1 and 100');
      expect(() => service.getRandomNames(101)).toThrow('Count must be between 1 and 100');
    });

    it('should use default count of 5 when no parameter provided', () => {
      const result = service.getRandomNames();
      expect(result.names).toHaveLength(5);
      expect(result.total).toBe(5);
    });
  });

  describe('getAllNames', () => {
    it('should return an array of all transformer names', () => {
      const result = service.getAllNames();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result[0]).toBe('string');
    });

    it('should return a copy of the array (not modify original)', () => {
      const result1 = service.getAllNames();
      const result2 = service.getAllNames();

      result1.push('Test Name');
      expect(result1.length).not.toBe(result2.length);
    });
  });

  describe('getTotalCount', () => {
    it('should return a positive number', () => {
      const count = service.getTotalCount();

      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThan(0);
    });
  });

  describe('searchNames', () => {
    it('should return matching names for valid query', () => {
      const result = service.searchNames('optimus');

      expect(Array.isArray(result)).toBe(true);
      result.forEach(name => {
        expect(name.toLowerCase()).toContain('optimus');
      });
    });

    it('should return empty array for empty query', () => {
      expect(service.searchNames('')).toEqual([]);
      expect(service.searchNames('   ')).toEqual([]);
    });

    it('should be case insensitive', () => {
      const lowerResult = service.searchNames('optimus');
      const upperResult = service.searchNames('OPTIMUS');

      expect(lowerResult).toEqual(upperResult);
    });

    it('should return empty array for non-existent names', () => {
      const result = service.searchNames('nonexistentnametest123');
      expect(result).toEqual([]);
    });
  });
});
