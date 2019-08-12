import React from 'react'
import DisplayBlog from '../components/post'

const Post = props => <DisplayBlog id={props.query.id} />

export default Post
