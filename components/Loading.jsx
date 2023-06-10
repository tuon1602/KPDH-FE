'use client';
import './Loading.css';

export default function Loading() {
  return (
    <div class="cube-container">
      <div class="scene">
        <div class="cube-wrapper">
          <div class="cube">
            <div class="cube-faces">
              <div class="cube-face shadow"></div>
              <div class="cube-face bottom"></div>
              <div class="cube-face top"></div>
              <div class="cube-face left"></div>
              <div class="cube-face right"></div>
              <div class="cube-face back"></div>
              <div class="cube-face front"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
