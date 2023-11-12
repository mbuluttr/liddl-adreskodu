export type GraphicForBina = {
  message: string;
  result: {
    geometryType: string;
    spatialReference: {
      latestWkid: number;
      wkid: number;
    };
    x: number;
    y: number;
  };
  success: boolean;
};
