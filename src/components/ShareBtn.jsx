import React from "react";

const ShareButtons = ({ url, title }) => {
  const encodedUrl = encodeURI(url);
  const encodedTitle = encodeURIComponent(title);

  const shareData = {
    title: encodedTitle,
    text: encodedTitle,
    url: encodedUrl,
  };

  const handleNativeShare = async () => {
    if (navigator.share()) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Share not supported in this browser");
    }
  };

  return (
    <div className="share-btn row">
      <div className="share-icon">
        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600"
        >
          <i className="fa fa-facebook" />
        </a>

        {/* Twitter/X */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-500"
        >
          <i className="fa fa-twitter" />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500"
        >
          <i className="fa fa-whatsapp" />
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-800"
        >
          <i className="fa fa-linkedin" />
        </a>

        {/* Native share (for mobile) */}
      </div>
      <button className="saveBtn" onClick={handleNativeShare}>
        <i className="bx bx-send"></i>
      </button>
    </div>
  );
};

export default ShareButtons;