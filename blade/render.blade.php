@php
  $block = (object) $block;
  $uid = uniqid();
  $blockId = "wp-block-{$uid}";
@endphp

<div class="wp-block-tinypixel-container {!! $blockId !!} @isset($block->attr['align']) align{!! $block->attr['align'] !!} @endisset">
  <div class="{!! $blockId !!}-inner overflow-hidden py-0 my-0">
    <div class="{!! $blockId !!}-inner__media relative w-100 h-100 mx-auto rounded-t overflow-hidden shadow">
      @isset($block->attr['media'])
        @if($block->attr['media']['type']=='video')
          <video
            id="{!! $blockId !!}-inner__video"
            class="absolute top-0 left-0 bottom-0 right-0 overflow-hidden"
            autoplay muted loop src="{!! $block->attr['media']['url'] !!}">
          </video>
        @endif
      @endisset

      <div class="{!! $blockId !!}-inner__scrim relative w-100 h-100 z-20 overflow-hidden">
        <div class="container relative z-20">
          {!! $block->content !!}
        </div>
      </div>
    </div>
  </div>
</div>

<style type="text/css">
  @isset($block->attr['media'])
    .{!! $blockId !!}-inner__media {
      background-image: url({!! $block->attr['media']['url'] !!});
      background-repeat: no-repeat;

      background-position: {!! $block->attr['focal'] ? ($block->attr['focal']['x'] * 100) : '50' !!}% {!! $block->attr['focal'] ? ($block->attr['focal']['y'] * 100) : '50' !!}%;

      background-size: @isset($block->attr['scale']) {!! $block->attr['scale'] !!}%; @else 'cover'; @endisset
    }

    @media (max-width: 500px) {
      .{!! $blockId !!}-inner__media {
        background-size: cover;
        background-position:
          {!! $block->attr['focal']['x'] * 200 !!}%
          {!! $block->attr['focal']['y'] * 200 !!}%;
      }
    }

    #{!! $blockId !!}-inner__video {
      position:   absolute;
      transform:  scale({!! $block->attr['scale'] / 50 !!})
                  translate({!! $block->attr['focal']['x'] ?
                            -($block->attr['focal']['x'] * 100) + 50 : 0 !!}%,
                            {!! $block->attr['focal']['y'] ?
                            -($block->attr['focal']['y'] * 100) + 50 : 0 !!}%);
    }
  @endisset
</style>

@isset($block->attr['color'])
  <style type="text/css">
    .{!! $blockId !!}-inner__scrim {
      background: {!! $block->attr['color'] !!};
    }
  </style>
@endisset
