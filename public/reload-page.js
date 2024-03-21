(function reloadPage() {
    setTimeout(() => {
      fetch('http://localhost:3000')
        .then(response => {
          if (!response.ok) {
            // Server not found, reload the page
            window.location.reload();
          }
        })
        .catch(() => {
          // Error occurred, reload the page
          window.location.reload();
        })
        .finally(() => {
          // Retry after 5 seconds
          reloadPage();
        });
    }, 2000); // Retry every 5 seconds
  })();
  