#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$REPO_ROOT/build-multi"

rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

partners=("full" "appOverseas" "appDomestic" "miniWechat" "miniDouyin" "miniKuaishou")
url_paths=("full" "app-overseas" "app-domestic" "mini-wechat" "mini-douyin" "mini-kuaishou")

for i in "${!partners[@]}"; do
  partner="${partners[$i]}"
  url_path="${url_paths[$i]}"

  echo "============================================"
  echo "Building partner: $partner -> $url_path"
  echo "============================================"

  export PARTNER="$partner"

  npx docusaurus clear
  npx docusaurus build

  if [ "$url_path" = "full" ]; then
    cp -r "$REPO_ROOT/build/." "$BUILD_DIR/"
  else
    mkdir -p "$BUILD_DIR/$url_path"
    cp -r "$REPO_ROOT/build/." "$BUILD_DIR/$url_path/"
  fi

  unset PARTNER
done

echo ""
echo "All builds complete. Output in $BUILD_DIR/"
echo ""
echo "Deployed URLs:"
echo "  Full:          https://ycl19920101.github.io/GameCPSDK/"
echo "  APP 海外版:    https://ycl19920101.github.io/GameCPSDK/app-overseas/"
echo "  APP 国内版:    https://ycl19920101.github.io/GameCPSDK/app-domestic/"
echo "  微信小游戏:    https://ycl19920101.github.io/GameCPSDK/mini-wechat/"
echo "  抖音小游戏:    https://ycl19920101.github.io/GameCPSDK/mini-douyin/"
echo "  快手小游戏:    https://ycl19920101.github.io/GameCPSDK/mini-kuaishou/"
