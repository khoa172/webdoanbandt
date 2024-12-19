<template>
    <v-container>
      <!-- Header -->
      <v-row class="mb-6 text-center">
        <v-col cols="12">
          <h1 class="main-title">Về Chúng Tôi</h1>
          <p class="subtitle">
            Chúng tôi tự hào là đơn vị tiên phong trong việc mang lại giải pháp công nghệ hiện đại, tối ưu hóa trải nghiệm của khách hàng.
          </p>
        </v-col>
      </v-row>
  
      <!-- Section: About Us -->
      <v-row class="mb-6">
        <v-col cols="12" md="12">
          <h2 class="section-title">Giới Thiệu</h2>
          <p>
            Chúng tôi là đội ngũ đam mê công nghệ, luôn nỗ lực không ngừng để cung cấp các giải pháp sáng tạo, phù hợp với nhu cầu của khách hàng. Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cam kết mang lại giá trị vượt trội và bền vững.
          </p>
        </v-col>
      </v-row>
  
      <!-- Section: Mission and Vision -->
      <v-row class="mb-6">
        
        <v-col cols="12" md="12">
          <h2 class="section-title">Sứ Mệnh</h2>
          <p>
            Chúng tôi luôn hướng đến việc cung cấp những sản phẩm và dịch vụ công nghệ cao cấp, giúp khách hàng đạt được mục tiêu và tạo ra sự khác biệt trên thị trường.
          </p>
          <h2 class="section-title mt-4">Tầm Nhìn</h2>
          <p>
            Trở thành công ty hàng đầu trong lĩnh vực công nghệ, được công nhận không chỉ bởi sự sáng tạo mà còn bởi giá trị mà chúng tôi mang lại cho cộng đồng.
          </p>
        </v-col>
      </v-row>
  
      <!-- Section: Our Team -->
      <v-row class="mb-6">
        <v-col cols="12" class="text-center">
          <h2 class="section-title">Team Của Chúng Tôi</h2>
        </v-col>
        <v-col cols="12" md="6" v-for="(member, index) in team" :key="index" class="text-center">
          <h3 class="team-name">{{ member.name }}</h3>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        team: [
          {
            name: "Nguyễn Lê Quốc Khoa",
          },
          {
            name: "Lâm Tuấn Kiệt",
           
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .main-title {
    font-size: 36px;
    color: #b91111;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .subtitle {
    font-size: 18px;
    color: #555;
    line-height: 1.6;
  }
  
  .section-title {
    font-size: 24px;
    color: #b91111;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .team-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .team-role {
    font-size: 16px;
    color: #777;
  }
  
  .rounded-lg {
    border-radius: 12px;
  }
  
  .text-center {
    text-align: center;
  }
  </style>
  