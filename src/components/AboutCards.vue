<template>
  <v-container class="container" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <div class="card-wrapper">
          <v-hover v-slot:default="{ isHovering, props }">
            <!-- Only show the card if dialog is not open -->
            <v-card v-if="!dialog" v-model="showCard" v-bind="props" class="card-wrap">
              <v-img v-if="activeCard.image" :src="activeCard.image" class="card-bg" @click="openDialog"></v-img>
              <v-card-title class="card-info">
                <div class="text-container">
                  <h1>
                    <v-icon>{{ activeCard.icon }}</v-icon> {{ activeCard.title }}
                    <v-spacer></v-spacer>
                    <v-icon title="Next Card" @click="nextCard">mdi-chevron-right</v-icon>
                  </h1>
                  <p @click="openDialog" class="read-more" :class="{ 'show-text': isHovering }">Click to Read More...</p>
                </div>
              </v-card-title>            
            </v-card>
          </v-hover>
        </div>
      </v-col>
    </v-row>
    
    <!-- Dialog Box for Details -->
    <v-dialog v-model="dialog" max-width="1000px" height="500px">
      <v-card>
        <v-row justify="center">
          <v-card-title class="dialog-title">
            <v-icon>{{ activeCard.icon }}</v-icon> {{ activeCard.title }}       
            <!-- Position the close button to the top-right -->
            <v-icon size="x-small" @click="closeDialog" class="close-btn position-absolute top-0 right-0">mdi-close</v-icon>
          </v-card-title>
          <v-divider></v-divider>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-img :src="activeCard.image" class="dialog-img"></v-img>
          </v-col>
          <v-col cols="6">
            <v-card-text>
              <p>{{ activeCard.details }}</p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      showCard:true,
      cards: [
        {
          icon: "mdi-leaf",
          title: "Ganga Basin",
          image: "https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=",
          details: "Content on Ganga Basin"
        },
        {
          icon: "mdi-water-check",
          title: "Water Quality",
          image: "https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=",
          details: "Content on Water Quality"
        },
        {
          icon: "mdi-alert",
          title: "Flood Hazard",
          image: "https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=",
          details: "Content on Flood Hazard"
        },
        {
          icon: "mdi-recycle",
          title: "Solid Waste",
          image: "https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
          details: "Content on Solid Waste"
        },
      ],
      activeIndex: 0,
      dialog: false, // controls dialog visibility
    };
  },
  computed: {
    activeCard() {
      return this.cards[this.activeIndex];
    },
  },
  methods: {
    nextCard() {
      this.activeIndex = (this.activeIndex + 1) % this.cards.length;
    },
    openDialog() {
      this.dialog = true; // open dialog when card is clicked
    },
    closeDialog() {
      this.dialog = false; // close dialog when the close button is clicked
    },
  },
};
</script>



<style scoped>
.container {
  padding: 50px 50px;
  display: flex;
  flex-wrap: wrap;
}

.card-wrapper {
  width: 350px;
  height: 235px;
  cursor: pointer;
}

.card-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
}

.card-bg {
  opacity: 0.9;
  transition: opacity 0.6s ease-out;
  border-radius: 12px;
}

.card-info {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.card-info h1 {
  font-family: "Poppins", sans-serif;
  color: whitesmoke;
  font-size: 25px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.read-more {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: white;
  text-decoration: underline;
  margin-left: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.show-text {
  opacity: 1;
  transform: translateY(0);
}

/* Dialog Box Styles */
.dialog-img {
  max-width: 100%;
  border-radius: 10px;
}

.dialog-title {
  font-size: 35px;
  font-weight: 500;
  color: #3f3f3f;
  display: flex;
  justify-content:space-between;
  align-items: center;
}

.close-btn {
  cursor: pointer;
  color: rgb(137, 17, 17);
}
</style>
