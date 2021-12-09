<template>
  <div id="editor">
    <div class="top-container">
      <el-input class="top-enter" v-model="editorForm.title" placeholder="输入文章标题..." />
      <el-button type="primary" round @click="dialogFormVisible = true">发布</el-button>
    </div>
    <editor
      ref="editor"
      :initialValue="editorText"
      :options="editorOptions"
      height="500px"
      initialEditType="wysiwyg"
      previewStyle="vertical"
      @focus ="onEditorFocus"
    />
    <el-dialog title="发布文章" :visible.sync="dialogFormVisible">
      <el-form :model="editorForm" class="editor-form">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <ul class="classify-list">
            <li
              v-for="(item, index) in categoryList"
              :key="index"
              class="classify-item"
              :class="activeIndex === index ? 'active' : ''"
              @click="handleCategoryItem(item, index)">{{item.label}}</li>
          </ul>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select v-model="editorForm.tag" placeholder="请选择活动区域" style="width: 100%">
            <el-option label="前端" value="web"></el-option>
            <el-option label="后端" value="backend"></el-option>
            <el-option label="javaScript" value="js"></el-option>
            <el-option label="GitHub" value="github"></el-option>
            <el-option label="面试" value="interview"></el-option>
            <el-option label="架构" value="structure"></el-option>
            <el-option label="Css" value="css"></el-option>
            <el-option label="Node.js" value="node"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleChangeUpload">
            <img v-if="editorForm.image" :src="editorForm.image" class="avatar">
            <div v-else class="img-none">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <span>上传封面</span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="编辑摘要" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入编辑摘要"
            v-model="editorForm.summary"
            maxlength="100"
            :autosize="{ minRows: 6}"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/vue-editor';
import axios from 'axios';
export default {
  name: 'markdown',
  components: {
    editor: Editor
  },
  data() {
    return {
      imageUrl: '',
      activeIndex: -1,
      categoryList: [
        {
          label: '前端',
          value: 'frontend'
        },
        {
          label: '后端',
          value: 'backend'
        },
        {
          label: '代码人生',
          value: 'codeLife'
        },
        {
          label: '阅读',
          value: 'read'
        },
        {
          label: '影视',
          value: 'tv'
        },
        {
          label: '代码人生',
          value: 'codeLife'
        },
        {
          label: '阅读',
          value: 'read'
        },
        {
          label: '影视',
          value: 'tv'
        }
      ],
      editorForm: {
        title: '',
        image: '',
        content: '',
        classify: '',
        summary: '',
        tag: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      inputVal: '',
      editorText: 'This is initialValue.',
      editorOptions: {
          minHeight: '200px',
          language: 'en-US',
          useCommandShortcut: true,
          useDefaultHTMLSanitizer: true,
          usageStatistics: true,
          hideModeSwitch: false,
          toolbarItems: [
            'heading',
            'bold',
            'italic',
            'strike',
            'divider',
            'hr',
            'quote',
            'divider',
            'ul',
            'ol',
            'task',
            'indent',
            'outdent',
            'divider',
            'table',
            'image',
            'link',
            'divider',
            'code',
            'codeblock'
          ]
      }
    }
  },
  methods: {
    handleCategoryItem(item, index) {
      this.editorForm.classify = item.value;
      this.activeIndex = index;
    },
    // 上传图片到服务器上
    async handleChangeUpload(file) {
      let formData = new FormData();
      formData.append('file', file.raw);
      await axios.post("http://localhost:7001/uploadImg",formData).then(({ data })=>{
        this.editorForm.image = `http://localhost:7001/${data.url}`;
      })
    },
    onEditorFocus(item) {
      console.log(item);
    },
    handleConfirm() {
      this.editorForm.content = this.$refs.editor.invoke('getHtml');
      axios.post("http://localhost:7001/article", this.editorForm).then(({ data })=>{
        console.log(data);
      })
    }
  }
}
</script>

<style>
.top-container {
  display: flex;
  padding: 10px;
}
.top-enter .el-input__inner {
  width: 70%;
  border: none;
  font-size: 24px;
}
.top-enter .el-input__inner:focus {
  border-color: transparent;
}
.top-enter .el-input__inner::placeholder {
  color: rgb(209, 206, 206);
}
.classify-list {
  white-space: normal;
}
.classify-item {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 0 0 7px;
  font-size: 14px;
  line-height: 28px;
  width: 88px;
  height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  border-radius: 2px;
  cursor: pointer;
  color: #86909c;
  background-color: #f4f5f5;
}
.classify-item:hover {
  background-color: #e5e6eb;
}
.active {
  color: #1d7dfa;
  background-color: #e8f3ff;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #f9f9f9;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .img-none {
    display: flex;
    flex-direction: column;
    width: 188px;
    height: 88px;
    line-height: 58px;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    height: 36px;
    line-height: 36px;
    text-align: center;
  }
  .avatar {
    width: 188px;
    height: 88px;
    display: block;
  }
  .editor-form .el-textarea textarea.el-textarea__inner{
    color: #1d2129;
    background: #fafafa;
  }
  .editor-form .el-textarea textarea.el-textarea__inner:hover {
    background: #fff;
  }
  .editor-form .el-textarea .el-input__count {
    background: transparent;
  }
</style>
