import HTTPService from "./services/api";
import { LoadMoreBtn } from "./loadMoreBtn";

const commentList = document.querySelector(".comments");
const loadMoreBtn = new LoadMoreBtn({
  selector: ".load-more",
  className: "is-hidden",
  isHidden: true,
  onClick() {
    loadComments();
  },
});

loadComments().then(() => {
  loadMoreBtn.show();
});

function loadComments() {
  return HTTPService.getComments().then((data) => {
    renderComments(data.comments);
    if (!data.hasNextPage) {
      loadMoreBtn.hide();
    }
  });
}

function renderComments(comments) {
  const markup = comments
    .map(
      ({ author, createdAt, content }) => `
    <article class="comment">
      <header>
        Posted by <b>${author}</b> on
        <time datetime="${createdAt}">${createdAt}</time>
      </header>
      <p>${content}</p>
    </article>`
    )
    .join("");

  commentList.insertAdjacentHTML("beforeend", markup);
}

// const commentList = document.querySelector('.comments');
// const loadMoreBtn = document.querySelector('.load-more');

// loadMoreBtn.classList.add('is-hidden');

// loadComments().then(() => {
//     loadMoreBtn.classList.remove('is-hidden');
// });

// loadMoreBtn.addEventListener('click', () => {
//     loadComments().then(() => {
//         if (page <= totalPage) {
//             loadMoreBtn.classList.add('is-hidden')
//         }
//     });
// });

// function loadComments() {
//   return HTTPService.getComments().then(comments => {
//     renderComments(comments);
//   });
// };

// function renderComments(comments) {
//   const markup = comments
//     .map(
//       ({ author, createdAt, content }) => `
//     <article class="comment">
//       <header>
//         Posted by <b>${author}</b> on
//         <time datetime="${createdAt}">${createdAt}</time>
//       </header>
//       <p>${content}</p>
//     </article>`
//     )
//     .join("");

//   commentList.insertAdjacentHTML("beforeend", markup);
// }
