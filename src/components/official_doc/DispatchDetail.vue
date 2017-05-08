<template>
  <div>
    <el-card style="margin-left: 10px; margin-right: 10px;">
      <span slot="header">公文详情</span>
      <table style="width:100%; border-collapse: collapse; table-layout: fixed; line-height:22px; margin-top:3px;">
        <colgroup span="6" width="16.6%"></colgroup>
        <tbody>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            公文类型：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 3px; border: 1px solid #6faadb; " colspan="5">
            <span id="documentType">{{dispatch.type}}</span></td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            标题：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 3px; border: 1px solid #6faadb; " colspan="5">
            <input type="hidden" id="title" value="erg">{{dispatch.title}}<span id="title_disp">erg</span></td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            主送单位：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 3px; border: 1px solid #6faadb; " colspan="5">
            <input type="hidden" id="deliveryOrg" value="waeg">{{dispatch.targetOrganization}}<span
            id="deliveryOrg_disp">waeg</span></td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            抄送单位：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 3px; border: 1px solid #6faadb; " colspan="5">
            <input type="hidden" id="ccOrg" value="waeg">{{dispatch.copyToOrganization}}<span
            id="ccOrg_disp">waeg</span></td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            正文：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 0px; border: 1px solid #6faadb; " colspan="5">
            <input type="hidden" value="">{{dispatch.content}}<input type="hidden">
            <div style="min-height: 30px; overflow:visible; padding-right: 3px;" id="checkDocument_div"></div>
          </td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            拟稿人：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 3px; border: 1px solid #6faadb; " colspan="5">
            <input type="hidden" value="">{{dispatch.owner}}<input type="hidden">
          </td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            核稿：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 0px; border: 1px solid #6faadb; " colspan="5">
            <input type="hidden" id="checkDocument__datas" value="">{{dispatch.checkComment}}<input type="hidden"
                                                                                                    id="checkDocument__signData">
            <div style="min-height: 30px; overflow:visible; padding-right: 3px;"></div>
          </td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            会签：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 0px; border: 1px solid #6faadb; " colspan="5">
            <input type="hidden" id="countersign__datas" value="">{{dispatch.countersign}}<input type="hidden"
                                                                                                 id="countersign__signData">
            <div style="min-height: 30px; overflow:visible; padding-right: 3px;" id="countersign_div"></div>
          </td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            签发：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 0px; border: 1px solid #6faadb; " colspan="5">
            <input type="hidden" id="sign__datas" value="">{{dispatch.sign}}<input type="hidden" id="sign__signData">
            <div style="min-height: 30px; overflow:visible; padding-right: 3px;" id="sign_div"></div>
          </td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            发文日期：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 3px; border: 1px solid #6faadb; " colspan="2">
            <span id="keyDate">{{Utils.getFormatDateStrFromMillis(dispatch.beginDate)}}</span></td>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            截止日期：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 3px; border: 1px solid #6faadb; " colspan="2">
            <input type="hidden" id="numCopies" value="">{{Utils.getFormatDateStrFromMillis(dispatch.deadline)}}<span
            id="numCopies_disp"></span></td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            公文状态：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 3px; border: 1px solid #6faadb; " colspan="5">
            <input type="hidden" id="receiverId" value="">{{dispatch.state}}<span id="receiverId_disp"></span></td>
        </tr>
        <tr>
          <td
            style="background-color:#fff; text-align: right; background-color: #f1f9fe; padding: 3px; border: 1px solid #6faadb; ">
            执行人：
          </td>
          <td style="background-color:#fff; text-align: left;  padding: 3px; border: 1px solid #6faadb; " colspan="5">
            <input type="hidden" value="">{{dispatch.executors}}<span></span></td>
        </tr>
        </tbody>
      </table>
    </el-card>
  </div>
</template>

<script>
  import Utils from '../base/Utils'

  export default{
    name: 'dispatch-detail',
    data () {
      return {
        dispatch: this.data,
        Utils: Utils
      }
    },
    props: ['data'],
    methods: {},
    computed: {},
    created: function () {}
  }
</script>

<style>

</style>
