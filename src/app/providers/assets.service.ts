import {Injectable} from '@angular/core';
import * as AssetsData from '../../assets.json';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private readonly assetsData = AssetsData;

  constructor() {
    // temporary delete default property. @todo: check why this property is creating
    delete this.assetsData.default;
  }

  /**
   * Get asset by asset path.
   *
   * Return file asset path for passed asset path.
   * @param {string} assetPath
   * @returns {string}
   */
  getAsset(assetPath: string): string {
    return this.assetsData[`/assets/${assetPath}`] ? this.assetsData[`/assets/${assetPath}`] : 'no-asset';
  }

  /**
   * Find assets by directory name.
   *
   * Return assets from passed directory name. Search only first level of directory tree.
   * @param {string} directory
   * @returns {object}
   */
  getAssetsByDirectory(directory: string): object {
    const assetsObject = {};
    Object.entries(this.assetsData).forEach(asset => {
      if (asset[0].split('/').indexOf(directory) === 2) {
        assetsObject[asset[0]] = asset[1];
      }
    });
    return assetsObject;
  }
}
