import { useCallback } from 'react';

export default function useImageDownload() {
  return useCallback(async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const a = document.createElement('a');
        a.href = reader.result;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
      reader.onerror = () => {
        throw new Error('FileReader failed');
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('下載失敗：', err);
      alert('下載失敗，請檢查 console：' + err.message);
    }
  }, []);
}
