<template>
    <div class="disc-container">
      <div class="disc" ref="disc"></div>
      <button @click="spinDisc">Toggle Theme</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DiscSpinner',
    data() {
      return {
        angle: 0, // Initialize the angle to 0
      };
    },
    methods: {
      spinDisc() {
        const body = document.body
        body.classList.toggle('dark')
        // This function will run the animation
        const disc = this.$refs.disc;
        let interval = setInterval(() => {
          this.angle += 10; // Increment the angle by 10 degrees
          disc.style.transform = `rotateY(${this.angle}deg)`; // Apply Y-axis rotation
  
          // Stop the animation after one full 360-degree spin
          if (this.angle >= 360) {
            clearInterval(interval); // Clear the interval to stop the animation
            this.angle = 0; // Reset the angle
          }
        }, 50); // Update every 50ms
      },
    },
  };
  </script>
  
  <style scoped>
  .disc-container {
    text-align: center;
    margin-top: 20px;
  }
  
  .disc {
    width: 150px;
    height: 150px;
    background-color: lightblue; /* Disc color */
    border-radius: 50%; /* Make it circular like a disc */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
    perspective: 1000px; /* Enable 3D perspective */
    backface-visibility: hidden; /* Hide the back face when rotated */
    transition: transform 1s ease; /* Smooth out the rotation */
  }
  
  .disc-container .disc {
    background-image: url('https://gravatar.com/avatar/74123bf8d459685cd0f02c1dd90c581d22258608efa9bc71e0a1356be57465db?size=512');
    background-size: cover;
    background-position: center;
    background-blend-mode: overlay;
  }
  </style>