<template>
  <div>
    <div class="container-fluid mt-100" >
      <div class="row">
        <div class="col-md-12">
          <div class="card mb-4">
            <div class="card-header">
              <div class="media flex-wrap w-100 align-items-center"> <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg" class="d-block ui-w-40 rounded-circle" alt="">
                <div class="media-body ml-3"> <a href="javascript:void(0)" data-abc="true">{{ posts.user_name }}</a>
                  <div class="text-muted small">{{ frontEndFormat(posts.date) }}</div>
                </div>
                <div class="text-muted small ml-3">
                  <div>Member since <strong>01/1/2019</strong></div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p>{{ posts.content }}</p>
            </div>
            <div class="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
              <div class="px-4 pt-3"> <a href="javascript:void(0)" class="text-muted d-inline-flex align-items-center align-middle" data-abc="true"> <i class="fa fa-heart text-danger"></i>&nbsp; <span class="align-middle">445</span> </a> <span class="text-muted d-inline-flex align-items-center align-middle ml-4"> <i class="fa fa-eye text-muted fsize-3"></i>&nbsp; <span class="align-middle">14532</span> </span> </div>
              <div class="px-4 pt-3"> <button type="button" class="btn btn-success" data-toggle="modal" data-target="#newReply"><i class="ion ion-md-create"></i>&nbsp; Reply</button> </div>
              <div class="modal fade" id="newReply" tabindex="-1" role="form" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="form">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenterTitle">Make a Reply</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form>
                      <div class="form-group" @submit.prevent="submitReply">
                        <label for="content">Content</label>
                        <textarea v-model="replyContent" class="form-control" id="content" rows="5"></textarea>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="submitReply" type="submit" class="btn btn-success">Save changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-for="reply in replies">
      <div class="container-fluid mt-100" :key="reply.reply_id">
        <div class="row" >
          <div class="col-md-12" >
            <div class="card mb-4">
              <div class="card-header">
                <div class="media flex-wrap w-100 align-items-center"> <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg" class="d-block ui-w-40 rounded-circle" alt="">
                  <div class="media-body ml-3"> <a href="javascript:void(0)" data-abc="true">{{ reply.user_name }}</a>
                    <div class="text-muted small">{{ frontEndFormat(reply.date) }}</div>
                  </div>
                  <div class="text-muted small ml-3">
                    <div>Member since <strong>01/1/2019</strong></div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <p>{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from "dayjs";


export default {
name: "ForumPost",

  data() {
    return {
      posts: [],
      replies: [],
      date: new (Date),
      replyContent: "",
      selectedRoute: this.$route.params.post_id,
    }
  },
    created() {
      axios.get(`http://localhost:3000/posts/` + this.selectedRoute)
          .then((response) => {
            this.posts = response.data;
            console.log(response);
          })
          .catch((e) => {
            this.posts = console.log(e);
          });
    },
  mounted() {
    axios.get(`http://localhost:3000/posts/` + this.selectedRoute + '/replies')
        .then((response) => {
          this.replies = response.data;
          console.log(response);
        })
        .catch((e) => {
          this.replies = console.log(e);
        });
  },
  methods: {
    submitReply() {
        axios.post(`http://localhost:3000/posts/` + this.selectedRoute + '/replies', {content: this.replyContent, post_id: this.selectedRoute, user_name: this.userName, date: this.date})
            .then((response) => {
              console.log(response);
            })
            .catch((e) => console.log(e));
    },
    frontEndFormat (date) {
      const formatDate = dayjs(date).format('YYYY/MM/DD HH:mm')
      return formatDate;
    }
  },
  computed: {
    userName() {
      return this.$store.state.name
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: .88rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: left;
  background-color: #eef1f3
}

.mt-100 {
  margin-top: 100px
}

.card {
  box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
  border-width: 0;
  transition: all .2s
}

.card-header:first-child {
  border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0
}

.card-header {
  display: flex;
  align-items: center;
  border-bottom-width: 1px;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: .625rem;
  height: 3.5rem;
  text-transform: uppercase;
  background-color: #fff;
  border-bottom: 1px solid rgba(26, 54, 126, 0.125)
}

.btn-primary {
  color: #fff;
  background-color: #3f6ad8;
  border-color: #3f6ad8
}

.btn {
  font-size: 0.8rem;
  font-weight: 500;
  outline: none !important;
  position: relative;
  transition: color 0.15s, background-color 0.15s, border-color 0.15s, box-shadow 0.15s
}

.card-body {
  flex: 1 1 auto;
  padding: 1.25rem
}

.card-body p {
  font-size: 13px
}

a {
  color: #E91E63;
  text-decoration: none !important;
  background-color: transparent
}

.media img {
  width: 40px;
  height: auto
}

</style>
