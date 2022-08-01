import HttpService from "./HttpService";


class CommentService extends HttpService {


    add = async (galleryId, newComment) => {
        const { data } = await this.client.post(`galleries/${galleryId}/comments`, newComment);
        return data;
    };

    delete = async (commentId) => {
        const { data } = await this.client.delete(`comments/${commentId}`);

        return data;
    };


}

const commentService = new CommentService();
export default commentService;