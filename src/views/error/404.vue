<template>
  <div class="result">
    <img class="result-img" src="@/assets/images/404.png" alt="" />
    <p>Sorry, the page you visited does not exist.</p>
  </div>
</template>
<style scoped>
.result {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
}
.result-img {
  width: 26%;
}
p {
  color: #00000073;
}
@media screen and (min-width: 768px) and (max-width: 1146px) {
  .result-img {
    width: 35%;
  }
}
/* <768px */
@media screen and (max-width: 768px) {
  .result-img {
    width: 50%;
  }
}
</style>
