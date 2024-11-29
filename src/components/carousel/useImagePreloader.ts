import { useState, useEffect } from "react";

interface ImageLoadingState {
  loaded: boolean;
  error: boolean;
}

export const useImagePreloader = (imageUrls: string[]) => {
  const [imageStates, setImageStates] = useState<
    Record<string, ImageLoadingState>
  >({});
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const imageStatesMap: Record<string, ImageLoadingState> = {};
    let mounted = true;

    const loadImage = (url: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();

        img.onload = () => {
          if (mounted) {
            imageStatesMap[url] = { loaded: true, error: false };
            setImageStates({ ...imageStatesMap });
          }
          resolve();
        };

        img.onerror = () => {
          if (mounted) {
            imageStatesMap[url] = { loaded: true, error: true };
            setImageStates({ ...imageStatesMap });
            console.warn(`Failed to load image: ${url}`);
          }
          resolve(); // Resolve anyway to continue with other images
        };

        img.src = url;
      });
    };

    const loadAllImages = async () => {
      try {
        // Initialize states
        imageUrls.forEach((url) => {
          imageStatesMap[url] = { loaded: false, error: false };
        });
        setImageStates({ ...imageStatesMap });

        // Load all images concurrently
        await Promise.all(imageUrls.map(loadImage));

        if (mounted) {
          setAllLoaded(true);
        }
      } catch (error) {
        console.error("Error in image preloading:", error);
        if (mounted) {
          setAllLoaded(true); // Continue anyway
        }
      }
    };

    loadAllImages();

    return () => {
      mounted = false;
    };
  }, [imageUrls]);

  return {
    allLoaded,
    imageStates,
  };
};
