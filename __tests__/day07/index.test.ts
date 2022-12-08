import { Directory, File } from '../../src/day07';

describe('day 7', () => {
  describe('The file system', () => {
    it('has directories with names', async function () {
      const root = new Directory('/');
      expect(root.name).toEqual('/');
    });

    it('is possible to create sub directories', async function () {
      const root = new Directory('/');
      root.createDirectory('a');
      root.createDirectory('b');
      expect(root.subDirectoryNames).toEqual(['a', 'b']);
    });

    it('is possible to select the sub directories', async function () {
      const root = new Directory('/');
      root.createDirectory('a');
      root.createDirectory('b');

      const a = root.openDirectory('a');
      expect(a.name).toEqual('a');
    });

    it('is possible to select the parent directory using ..', async function () {
      const root = new Directory('/');
      root.createDirectory('a');
      const a = root.openDirectory('a');
      const hopefullyRoot = a.openDirectory('..');
      expect(hopefullyRoot.name).toEqual('/');
    });

    it('is possible to add a file to a directory', async function () {
      const root = new Directory('/');
      root.addFile(new File('file.txt', 90000));
      expect(root.fileNames).toEqual(['file.txt']);
    });

    it('is possible to get the size of a directory', async function () {
      const root = new Directory('/');
      root
        .addFile(new File('file_1.txt', 10))
        .createDirectory('a')
        .openDirectory('a')
        .addFile(new File('file_2.txt', 20))
        .addFile(new File('file_3.txt', 20))
        .openDirectory('..')
        .createDirectory('b')
        .addFile(new File('file_4.txt', 50));
      expect(root.size).toEqual(100);
    });
  });
});
