#!/bin/bash

echo "========================================"
echo "  表单引擎管理系统 - 启动服务器"
echo "========================================"
echo ""
echo "正在启动 HTTP 服务器..."
echo "服务器地址: http://localhost:8000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "========================================"
echo ""

cd "$(dirname "$0")"
python3 -m http.server 8000

