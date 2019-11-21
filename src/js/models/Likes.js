export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, ing) {
    const likes = { id, title, author, ing };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findex(el => el.id === id);
    this.likes.spliice(index, 1);
  }

  isLikes(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }
}
