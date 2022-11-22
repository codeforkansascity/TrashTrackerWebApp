const customFetch = async (url, requestOptions) => {
  return await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      if ( data.error ) {
        alert(data.error.message + ". Please contact the administrator.")
      } else if ( data.success ) {
        alert("Success! Please refresh the page to view your changes.")
      }
      else if ( data.message === 'Internal server error' ) {
        alert("Internal server error. Please contact the administrator.")
      }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Something went wrong! Please contact the administrator.")
    });
}

export default customFetch;