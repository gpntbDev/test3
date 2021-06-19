<script>
  import { onMount, createEventDispatcher } from "svelte";
  export let input = "";
  export let id = "";
  const dispatch = createEventDispatcher();

  onMount(() => {
    if (window.ymaps) {
      console.log(window.ymaps);
      var suggestViewOne = new ymaps.SuggestView(input);
      suggestViewOne.events.add("select", function (e) {
        dispatch("select", { value: e.get("item").value });
      });
    } else {
      const script = document.createElement("script");
      script.id = id;
      script.src =
        "https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=SuggestView";
      script.onload = () => {
        ymaps.ready(function () {
          var suggestViewOne = new ymaps.SuggestView(input);
          suggestViewOne.events.add("select", function (e) {
            dispatch("select", { value: e.get("item").value });
          });
        });
      };
      document.head.append(script);
      return () => {
        document.head.querySelector(`script#${id}`).remove();
      };
    }
  });
</script>
