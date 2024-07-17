export const ImageDisplay = () => {
    const images = {
        front: "https://storage.googleapis.com/download/storage/v1/b/cms_products/o/cms%2Fimages%2Fnullfront?generation=1704956926794736&alt=media",
        back: "https://storage.googleapis.com/download/storage/v1/b/cms_products/o/cms%2Fimages%2Fnullback?generation=1704956928601605&alt=media",
        top: "https://storage.googleapis.com/download/storage/v1/b/cms_products/o/cms%2Fimages%2Fnulltop?generation=1704956930800254&alt=media",
        bottom: "https://storage.googleapis.com/download/storage/v1/b/cms_products/o/cms%2Fimages%2Fnullbottom?generation=1704956932094493&alt=media",
        left: "https://storage.googleapis.com/download/storage/v1/b/cms_products/o/cms%2Fimages%2Fnullleft?generation=1704956932589027&alt=media",
        right: "https://storage.googleapis.com/download/storage/v1/b/cms_products/o/cms%2Fimages%2Fnullright?generation=1704956933506706&alt=media",
        top_left: null,
        top_right: null
      };
      
    return (
      <div>
        {Object.entries(images).map(([position, url]) => (
          url ? (
            <div key={position}>
              <h3>{position.replace('_', ' ').toUpperCase()}</h3>
              <img src={url} alt={position} style={{ width: '100%', height: 'auto' }} />
            </div>
          ) : null
        ))}
      </div>
    );
  };