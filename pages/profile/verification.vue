<template>
  <div class="CabinetPage VerificationPage">
    <div class="CabinetPage-Title VerificationPage-Title">
      {{ $t('profile.pages.verification') }}
    </div>
    <div class="VerificationPage-Content">
      <!--      <div class="VerificationPage-Item">-->
      <!--        <div class="VerificationPage-Desc">-->
      <!--          <svg class="VerificationPage-Approve VerificationPage-Approve&#45;&#45;approved">-->
      <!--            <use xlink:href="@/assets/img/icons.svg#approve"></use>-->
      <!--          </svg>-->
      <!--          <div class="VerificationPage-Title">-->
      <!--            <div class="VerificationPage-Name">-->
      <!--              Selfie & Id verification-->
      <!--            </div>-->
      <!--            <div class="VerificationPage-Text">-->
      <!--              Passport, drivers license, or other official document replacing them.-->
      <!--              <a href="#" class="CabinetPage-Link">More info</a>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="VerificationPage-Docs">-->
      <!--          <div class="VerificationPage-DocsContent">-->
      <!--            <div class="VerificationPage-Close">-->
      <!--              <div class="Close"></div>-->
      <!--            </div>-->
      <!--            <div class="VerificationPage-DocsTitle">-->
      <!--              Uploaded documents-->
      <!--            </div>-->
      <!--            <div class="VerificationPage-Name">-->
      <!--              Michelle Harris.pdf-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="VerificationPage-Item">-->
      <!--        <div class="VerificationPage-Desc">-->
      <!--          <svg class="VerificationPage-Approve">-->
      <!--            <use xlink:href="@/assets/img/icons.svg#approve"></use>-->
      <!--          </svg>-->
      <!--          <div class="VerificationPage-Title">-->
      <!--            <div class="VerificationPage-Name">-->
      <!--              Address verification-->
      <!--            </div>-->
      <!--            <div class="VerificationPage-Text">-->
      <!--              Until bill, phone bill, or bank statement, in which your name and address are fully-->
      <!--              indicated. <a href="#" class="CabinetPage-Link">More info</a>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="VerificationPage-Docs">-->
      <!--          <client-only>-->
      <!--            <vueDropzone-->
      <!--              id="dropzone"-->
      <!--              ref="myVueDropzone"-->
      <!--              :options="dropzoneOptions"-->
      <!--              :use-custom-slot="true"-->
      <!--            >-->
      <!--              <div class="VerificationPage-DocsContent">-->
      <!--                <div class="VerificationPage-Close">-->
      <!--                  <div class="Close"></div>-->
      <!--                </div>-->
      <!--                <div class="VerificationPage-Text">-->
      <!--                  Dpor file here or <span class="CabinetPage-Link">browse</span>-->
      <!--                  jpg. png. Max size 2MB-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </vueDropzone>-->
      <!--          </client-only>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="VerificationPage-Item">-->
      <!--        <div class="VerificationPage-Desc">-->
      <!--          <svg class="VerificationPage-Approve">-->
      <!--            <use xlink:href="@/assets/img/icons.svg#approve"></use>-->
      <!--          </svg>-->
      <!--          <div class="VerificationPage-Title">-->
      <!--            <div class="VerificationPage-Name">-->
      <!--              Selfie & Id verification-->
      <!--            </div>-->
      <!--            <div class="VerificationPage-Text">-->
      <!--              Screenshot or photo from onlone bank, bank statement, Skrill page,etc,showing the-->
      <!--              deposit. <a href="#" class="CabinetPage-Link">More info</a>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="VerificationPage-Docs">-->
      <!--          <client-only>-->
      <!--            <vueDropzone-->
      <!--              id="dropzone2"-->
      <!--              ref="myVueDropzone2"-->
      <!--              :options="dropzoneOptions"-->
      <!--              :use-custom-slot="true"-->
      <!--            >-->
      <!--              <div class="VerificationPage-DocsContent">-->
      <!--                <div class="VerificationPage-Close">-->
      <!--                  <div class="Close"></div>-->
      <!--                </div>-->
      <!--                <div class="VerificationPage-Text">-->
      <!--                  Dpor file here or <span class="CabinetPage-Link">browse</span>-->
      <!--                  jpg. png. Max size 2MB-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </vueDropzone>-->
      <!--          </client-only>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="VerificationPage-Item">
        <div class="VerificationPage-Desc">
          <svg
            class="VerificationPage-Approve VerificationPage-Approve--large"
            :class="[
              {
                'VerificationPage-Approve--pending':
                  documentsStatus.length && documentsStatus === 'pending',
              },
              { 'VerificationPage-Approve--approved': documentsStatus === 'approved' },
              { 'VerificationPage-Approve--declined': documentsStatus === 'declined' },
            ]"
          >
            <use xlink:href="@/assets/img/icons.svg#approve"></use>
          </svg>
          <div class="VerificationPage-Title">
            <div class="VerificationPage-Name">{{ $t('profile.verification.documents') }}</div>
            <div class="VerificationPage-Text">
              {{ $t('profile.verification.text') }}
            </div>
            <div
              v-if="documentsStatus.length && documentsStatus === 'pending'"
              class="VerificationPage-Approved VerificationPage-Approved--pending"
            >
              {{ $t('profile.verification.waiting') }}
            </div>
            <div
              v-if="documentsStatus === 'approved'"
              class="VerificationPage-Approved VerificationPage-Approved--approved"
            >
              {{ $t('profile.verification.approved') }}
            </div>
            <div
              v-if="documentsStatus === 'declined'"
              class="VerificationPage-Approved VerificationPage-Approved--declined"
            >
              {{ $t('profile.verification.disapproved') }}
            </div>
          </div>
        </div>
        <div class="VerificationPage-Docs">
          <div v-if="userDocumentList.length" class="VerificationPage-DocsContent">
            <div class="VerificationPage-DocsTitle">{{ $t('profile.verification.uploaded') }}</div>
            <div v-for="doc in userDocumentList" :key="doc.id" class="VerificationPage-Doc">
              <svg
                class="VerificationPage-Approve VerificationPage-Approve--min"
                :class="[
                  {
                    'VerificationPage-Approve--pending': doc.status === 'pending',
                  },
                  { 'VerificationPage-Approve--approved': doc.status === 'approved' },
                  { 'VerificationPage-Approve--declined': doc.status === 'disapproved' },
                ]"
              >
                <use xlink:href="@/assets/img/icons.svg#approve"></use>
              </svg>
              <div class="VerificationPage-DocName" @click="onClickDocument(doc.id)">
                {{ doc.name }}
              </div>
              <div class="VerificationPage-Close" @click="onDeleteDocument(doc.id)">
                <div class="Close"></div>
              </div>
            </div>
          </div>
          <client-only>
            <vueDropzone
              id="dropzone"
              ref="myVueDropzone"
              :options="dropzoneOptions"
              :use-custom-slot="true"
              :duplicate-check="true"
              @vdropzone-sending="onSendRequest"
              @vdropzone-success="onSuccessUpload"
              @vdropzone-error="onErrorUpload"
            >
              <div class="VerificationPage-Dropzone">
                <div class="VerificationPage-Text">{{ $t('profile.verification.drop') }} 110Mb</div>
              </div>
            </vueDropzone>
          </client-only>
        </div>
      </div>
      <!--      <div class="VerificationPage-Item">-->
      <!--        <div class="VerificationPage-Desc">-->
      <!--          <svg class="VerificationPage-Approve VerificationPage-Approve&#45;&#45;approved">-->
      <!--            <use xlink:href="@/assets/img/icons.svg#approve"></use>-->
      <!--          </svg>-->
      <!--          <div class="VerificationPage-Title">-->
      <!--            <div class="VerificationPage-Name">-->
      <!--              Phone verification-->
      <!--            </div>-->
      <!--            <div class="VerificationPage-Approved">-->
      <!--              Approved-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="VerificationPage-Docs">-->
      <!--          <div class="VerificationPage-DocsContent">-->
      <!--            <div class="VerificationPage-DocsTitle">-->
      <!--              Phone number-->
      <!--            </div>-->
      <!--            <div class="VerificationPage-Name VerificationPage-Doc">-->
      <!--              +3585****289-->
      <!--              <div class="VerificationPage-Close">-->
      <!--                <div class="Close"></div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { API_HOST } from '@/config';
import { mapActions, mapState, mapMutations } from 'vuex';
import Loader from '@/components/Loader';

const vue2Dropzone = () => import('vue2-dropzone');

export default {
  name: 'VerificationPage',
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: `${API_HOST}/document`,
        maxFilesize: 110,
        thumbnailHeight: 100,
        thumbnailMethod: 'contain',
        addRemoveLinks: true,
        acceptedFiles: 'image/*, application/pdf',
      },
    };
  },
  computed: {
    ...mapState(['token']),
    ...mapState('profile', [
      'userDocumentList',
      'originalFile',
      'originalFileIsLoading',
      'originalFileError',
    ]),
    documentsStatus() {
      if (!this.userDocumentList.length) return 'noDocuments';
      if (this.userDocumentList.every(doc => doc.status === 'approved')) return 'approved';
      if (this.userDocumentList.every(doc => doc.status === 'disapproved')) return 'declined';
      return 'pending';
    },
  },
  created() {
    this.getUserDocumentList();
  },
  mounted() {
    this.dropzoneOptions.headers = { 'X-Auth-Token': this.token };
  },
  methods: {
    ...mapMutations('profile', ['setOriginalFile', 'setOriginalFileError']),
    ...mapActions(['logout']),
    ...mapActions('profile', ['getUserDocumentList', 'showUserDocument', 'deleteUserDocument']),
    onDeleteDocument(id) {
      this.deleteUserDocument(id).then(() => this.getUserDocumentList());
    },
    onSendRequest(file, xhr, formData) {
      formData.append('name', file.name);
    },
    onSuccessUpload() {
      this.getUserDocumentList().then(() => this.$refs.myVueDropzone.removeAllFiles());
    },
    onErrorUpload({ xhr }) {
      if (xhr && xhr.status === 401) this.logout(true);
    },
    beforeCloseModalOriginalFile() {
      this.setOriginalFile(null);
      if (this.originalFileError) this.setOriginalFileError('');
    },
    onClickDocument(id) {
      this.showUserDocument(id);
      this.$modal.show(
        {
          template: `
            <div class="Modal">
              <div class="Close Modal-Close" @click="$emit('close')" />
              <div class="VerificationPage-File">
                <Loader v-if="originalFileIsLoading" />
                <div v-else-if="originalFileError">{{ originalFileError }}</div>
                <img class="VerificationPage-FileImg" v-else :src="createObjectURL(originalFile)" />
              </div>
            </div>
          `,
          components: { Loader },
          computed: {
            ...mapState('profile', ['originalFile', 'originalFileIsLoading', 'originalFileError']),
          },
          methods: {
            createObjectURL(src) {
              return URL.createObjectURL(src);
            },
          },
        },
        {},
        { width: '90%', height: 'auto', adaptive: true, scrollable: true },
        {
          'before-close': this.beforeCloseModalOriginalFile,
        },
      );
    },
  },
};
</script>

<style lang="scss">
.VerificationPage {
  &-Content {
    width: 100%;
    margin-top: 36px;
  }

  &-Item {
    width: 100%;
    margin-bottom: 16px;

    @media (min-width: $screen-m) {
      display: flex;
      margin-bottom: 6px;
    }
  }

  &-Desc {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 16px;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      justify-content: flex-start;
      margin-right: 6px;
      margin-bottom: 0;
      padding: 28px;
    }
  }

  &-Approve {
    flex-shrink: 0;
    fill: var(--color-bg-lighter);

    &--pending {
      fill: var(--color-main1);
    }

    &--approved {
      fill: var(--color-accept);
    }

    &--declined {
      fill: var(--color-error);
    }

    &--large {
      order: 1;
      width: 34px;
      height: 34px;

      @media (min-width: $screen-m) {
        order: 0;
        width: 54px;
        height: 54px;
        margin-right: 29px;
      }
    }

    &--min {
      width: 25px;
      height: 25px;
      margin-right: 15px;
    }
  }

  &-Title {
    margin-right: 25px;
  }

  &-Doc {
    display: flex;
    align-items: center;
    min-height: 24px;
    margin-bottom: 15px;
  }

  &-DocName {
    margin-right: 15px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.09;
    color: var(--color-text-main);
    text-transform: uppercase;
    word-break: break-word;
    cursor: pointer;
  }

  &-Name {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.09;
    color: var(--color-text-main);
    text-transform: uppercase;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-Text {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.339;
    color: var(--color-text-ghost);
  }

  &-Docs {
    position: relative;
    display: flex;
    flex-direction: column;
    background: rgba(27, 33, 56, 0.2);
    border: 2px dashed var(--color-bg-lighter);

    @media (min-width: $screen-m) {
      flex-shrink: 0;
      width: 324px;
    }
  }

  &-DocsContent {
    width: 100%;
    //padding: 16px 56px 16px 16px;
    padding: 16px;

    @media (min-width: $screen-m) {
      //padding: 28px 68px 28px 66px;
      padding: 28px 16px 28px 66px;
    }

    + .dropzone {
      border-top: 2px dashed var(--color-bg-lighter);
    }
  }

  &-Dropzone {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 16px 56px 16px 16px;
    cursor: pointer;

    @media (min-width: $screen-m) {
      padding: 28px 68px 28px 66px;
    }
  }

  &-DocsTitle {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.09;
    color: var(--color-text-ghost);
    text-transform: uppercase;
    white-space: nowrap;
  }

  &-Close {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin-left: auto;
    background: var(--color-bg-lighter);
    cursor: pointer;
  }

  &-Approved {
    margin-top: 12px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.09;
    text-transform: uppercase;

    &--approved {
      color: var(--color-accept);
    }

    &--pending {
      color: var(--color-main1);
    }

    &--declined {
      color: var(--color-error);
    }
  }

  &-File {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: auto;
    background: var(--color-body);
  }

  .dropzone {
    flex-grow: 1;
  }
}
</style>
