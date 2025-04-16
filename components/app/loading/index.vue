<script setup lang="ts">
defineOptions({
  name: 'AppLoading'
});

const { loading } = defineProps<{ loading?: boolean }>();
const loadingMask: Ref<HTMLDivElement | null> = ref(null);

const resizeObserver = new ResizeObserver(() => {
  const loadingEl = loadingMask.value as HTMLDivElement;
  const parentEl = loadingEl?.parentElement;

  if (!loadingEl || !parentEl) {
    return;
  }

  const clientRect = parentEl.getBoundingClientRect();
  const rectProps = ['top', 'left', 'width', 'height'];

  type DomRectProp = keyof typeof clientRect;

  for (const prop of rectProps) {
    loadingEl.style.setProperty(prop, `${clientRect[prop as DomRectProp]}px`);
  }
});

watchEffect(() => {
  document.body.inert = loading || false;
});

onMounted(() => {
  const parentEl = loadingMask.value!.parentElement;

  if (!parentEl) {
    return;
  }

  resizeObserver.observe(parentEl);

  onUnmounted(() => {
    resizeObserver.unobserve(parentEl);
  });
});
</script>

<template>
  <div
    v-show="loading"
    ref="loadingMask"
    class="app-loading"
  >
    <app-loading-spinner />
  </div>
</template>

<style lang="scss" scoped>
.app-loading {
  position: fixed;
  user-select: none;
  z-index: 100000;
  background-color: theme-color(gray6, 0.6);
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
