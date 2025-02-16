import { useState } from "react";

export default function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 파일 업로드 핸들러
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  // API 요청 (OCR 실행)
  const handleUpload = async () => {
    if (!image) return alert("이미지를 선택하세요!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("https://your-api-url.com/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("OCR 처리 중 오류 발생!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">OCR 서비스</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "처리 중..." : "OCR 실행"}
      </button>

      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow-md w-full max-w-md">
          <h2 className="text-lg font-bold">추출된 정보:</h2>
          <p>📌 바코드: {result.barcode || "없음"}</p>
          <p>⚖ 무게: {result.weight || "없음"} kg</p>
          <a
            href={result.excel_url}
            download
            className="block mt-4 text-blue-600 underline"
          >
            📥 엑셀 다운로드
          </a>
        </div>
      )}
    </div>
  );
}
