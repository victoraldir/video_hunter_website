    const API_BASE_URL = "https://myvideohunter.com/prod/url";

    export async function postVideoUrl(videoUrl) {
      const data = { video_url: videoUrl };
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // Try to parse error message from API, otherwise use a generic one
        let errorMessage = 'Failed to download video. Please check the URL and try again.';
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // Ignore if response is not JSON or other parsing error
        }
        throw new Error(errorMessage);
      }
      return response.json();
    }

    export function getDownloadLink(id) {
      return `${API_BASE_URL}/${id}`;
    }
    