export function getObjectImage(objectGID: number, imagesCollection: any[]) {
  let objectImage;
  imagesCollection.forEach((collection) =>
    collection.images.forEach((image) => {
      if (!objectImage && image.gid === objectGID) {
        objectImage = image.image;
      }
    })
  );
  objectImage =
    objectImage && objectImage.indexOf('/')
      ? objectImage.split('/').reverse()[0]
      : objectImage;
  return objectImage;
}
