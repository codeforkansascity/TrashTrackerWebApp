"use strict";

const dataTable = document.getElementById("data-table");

// Fetch Data

fetch(
  "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/:body"
)
  .then((res) => {
    if (!res.ok) {
      throw Error("Data not retrieved");
    }
    console.log(res.status);
    return res.json();
  })
  .then((data) => {
    console.log(data[0].body);

    //   HTML Content for Data Table

    for (let i = 0; i < data.length; i++) {
      dataTable.innerHTML += ` <tr class="data-row">
<th scope="row">
  <img src="${data[i].photo_url}" class="img-thumb ${
        data[i].body
      }" alt="Thumbnail Not Provided" onClick="openImg('${
        data[i].photo_url
      }')" />
</th>
<td><img src="images/geo-point.svg" alt="Location Point" /></td>
<td>${data[i].location.slice(9, 50).toUpperCase()}</td>
<td>${data[i].trash_name}</td>
<td>${data[i].report_date.slice(0, 10, 19)}</td>
<td>${data[i].report_from}</td>

<td>
  <button class="btn-view">View</button>
  <button class="btn-del">Del</button>
  <button class="btn-mark">Complete</button>
</td>
</tr>

<div class="dynamic-modal">    
<div class="modal hidden" id="modal-${data[i].body}">
<button class="close-modal">&times;</button>
  <div id="modal-content"><img class="modal-img" src="${
    data[i].photo_url
  }" alt=""</div>
<div class="overlay hidden"></div></div>
`;
    }
  });

//   .catch((err) => console.error(err));

// Modal Functionality

var modal = document.querySelector(".my-modal");
var overlay = document.querySelector(".overlay");
var btnCloseModal = document.querySelector(".close-modal");
var modalImg = document.getElementById("modal-img");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  // console.log(e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function openImg(img) {
  console.log(img);
  modalImg.innerHTML = `<img class="my-modal-img" src="${img}"> `;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
