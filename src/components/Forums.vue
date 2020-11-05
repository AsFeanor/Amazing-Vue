<template>
  <div>
    <div class="container-fluid mt-100">
      <div class="d-flex flex-wrap justify-content-between">
        <div> <button type="button" class="btn btn-shadow btn-wide btn-success" data-toggle="modal" data-target="#newForum"><span class="btn-icon-wrapper pr-2 opacity-7"> <i class="fa fa-plus fa-w-20"></i> </span> New thread </button> </div>
        <div class="modal fade" id="newForum" tabindex="-1" role="form" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="form">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Create a Forum</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div class="form-group" @submit.prevent="submitForm">
                  <label class="modal-label text-muted" for="title">Title</label>
                  <input v-model="postTitle" class="form-control" id="title" type="text">
                  <label class="modal-label text-muted" for="content">Content</label>
                  <textarea v-model="postContent" class="form-control" id="content" rows="5"></textarea>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button @click.prevent="submitDelay" type="submit" class="btn btn-success">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3 p-0 mb-3"> <input type="text" class="form-control" placeholder="Search..."> </div>
      </div>
      <div class="card mb-3">
        <div class="card-header pl-0 pr-0">
          <div class="row no-gutters w-100 align-items-center">
            <div class="col ml-3">Topics</div>
            <div class="col-4 text-muted">
              <div class="row no-gutters align-items-center">
                <div class="col-4">Replies</div>
                <div class="col-8">Last update</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body py-3" v-for="post in posts" :key="post.post_id">
          <div class="row no-gutters align-items-center">
            <div class="col"><router-link :to="`post/${post.post_id}`" class="text-big" data-abc="true">{{ post.title }}</router-link>
              <div class="text-muted small mt-1">{{ frontEndFormat(post.date) }} &nbsp;·&nbsp; <a href="javascript:void(0)" class="text-muted" data-abc="true">{{ post.user_name }}</a></div>
            </div>
            <div class="d-none d-md-block col-4">
              <div class="row no-gutters align-items-center">
                <div class="col-4">12</div>
                <div class="media col-8 align-items-center"> <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg" alt="" class="d-block ui-w-30 rounded-circle">
                  <div class="media-body flex-truncate ml-2">
                    <div class="line-height-1 text-truncate">1 day ago</div> <a href="javascript:void(0)" class="text-muted small text-truncate" data-abc="true">by Tim cook</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="m-0">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
import router from "@/router";


export default {
name: "Forums",
  data() {
  return {
    posts: [],
    postTitle: "",
    postContent: "",
    date: new Date(),
  }
  },
  mounted() {
        axios.get('http://localhost:3000/posts')
        .then((response) => {
          this.posts = response.data;
        })
        .catch((e) => {
          this.posts = console.log(e);
        });
  },
  methods:{
    submitForm() {
      const titleIsValid = !!this.postTitle;
      const contentIsValid = !!this.postContent;
      const formIsValid = titleIsValid && contentIsValid;
        if (formIsValid) {
          axios.post('http://localhost:3000/posts', {
            title: this.postTitle,
            content: this.postContent,
            user_name: this.userName,
            date: this.date,
            member_since: this.memberSince
          })
              .then((response) => {
                console.log(response);
              })
              .catch((e) => console.log(e));
        }
      else {
        console.log('Invalid')
      }
    },
    submitDelay() {
      this.$toast.success({
        title:'Posted Successfully',
        message:'Your post has been successfully added.'
      })
      setTimeout(() => {
        this.submitForm()
        this.$router.go(0)
      },4000)
    },
    frontEndFormat (date) {
      const formatDate = dayjs(date).format('YYYY/MM/DD HH:mm')
      return formatDate;
    },
  },
  computed: {
    userName() {
      return this.$store.state.name
    },
    memberSince() {
      return this.$store.state.member_since
    },
    // sortedPosts() {
    //   return this.posts.slice().sort((a, b) => b.date - a.date)
    // }
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
  margin-top: 80px
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
  background-color: #fff;
  border-bottom: 1px solid rgba(26, 54, 126, 0.125)
}

.btn-success.btn-shadow {
  box-shadow: 0 0.125rem 0.625rem rgb(31, 134, 36), 0 0.0625rem 0.125rem rgb(44, 155, 75)
}

.btn.btn-wide {
  padding: .375rem 1.5rem;
  font-size: .8rem;
  line-height: 1.5;
  border-radius: .25rem
}

.btn-success {
  color: #fff;

}

.modal-label {
  padding-left: 18px;
  padding-top: 5px;
  margin-bottom: 2px !important;
  margin-left: 2px !important;
  font-weight: bold;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out
}

.card-body {
  flex: 1 1 auto;
  padding: 1.25rem
}

.flex-truncate {
  min-width: 0 !important
}

.d-block {
  display: block !important
}

a {
  color: #0275d8;
  text-decoration: none !important;
  background-color: transparent
}

a:hover{
  color: #00437e;
}
.media img {
  width: 40px;
  height: auto
}
</style>
