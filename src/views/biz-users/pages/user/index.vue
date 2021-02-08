<template>
  <div class="user-list-container">
    <el-form inline>
      <el-row>
        <el-col :span="6">
          <el-form-item label="username">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="nickname">
            <el-input/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button icon="el-icon-search" type="primary">查询</el-button>
          <el-button icon="el-icon-refresh-right" type="primary">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="datasource" border>
      <el-table-column label="id" prop="id"/>
      <el-table-column label="用户名" prop="username"/>
      <el-table-column label="昵称" prop="nickname"/>
      <el-table-column label="创建时间" prop="createTime"/>
    </el-table>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { fetchUserList } from '../../api'

export default {
  meta: {
    title: '用户列表',
  },
  name: "UserList",
  setup() {
    const datasource = ref([]);
    onMounted(async () => {
      const {list} = await fetchUserList()
      datasource.value = list
    });

    return {
      datasource
    };
  }
}
</script>

<style scoped lang="scss">
.user-list-container {
  .pro-search {
    margin-bottom: 16px;
    padding: 12px;
    background: #fff;
    .el-row {
      display: flex;
      flex-wrap: wrap;
      .el-form-item__label {
        color: black;
      }
      .el-col:nth-child(n+5) {
        margin-top: 12px;
      }
    }
  }
}
</style>
