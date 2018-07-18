import {Injectable} from '@angular/core';
import * as AssetsData from '../../assets.json';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private readonly assetsData = AssetsData;

  getAsset(assetPath: string) {
    return this.assetsData[`/assets/${assetPath}`] ? this.assetsData[`/assets/${assetPath}`] : 'no-asset';
  }
}
