---
title: "论文精读1：Diffusion Models for Medical Anomaly Detection"
description: "论文精读第一期！"
date: "2024-12-19"
published: false
banner:
    src: "/images/default.jpg"
    alt: "default image"
    caption: ''
categories:
- "论文精读"
keywords:
- ""
---
## 相关链接
- [代码仓库](https://github.com/JuliaWolleb/diffusion-anomaly)
- [BraTS2020数据集](https://www.med.upenn.edu/cbica/brats2020/data.html)
- [CheXpert](https://stanfordmlgroup.github.io/competitions/chexpert/)

## 工作引用
1. DDPM

## 阅读背景

## 同等效果训练条件
NVIDIA Quadro RTX6000 GPU (相当于0.83 * V100 32GB), 1 day.

## 数据预处理
- CheXpert（胸腔积液， X-ray图片）: 
    1. 统一图片大小(256*256)， 灰度正则化(0-1);
- BRATS2020（脑瘤， 3D核磁共振影像）:
    1. 统一图片大小(256*256)， 灰度正则化(0-1);
    2. 采用轴向切片（从底部到顶部），根据脑瘤多发位置，确定切片高度范围（本篇剔除了底部的80个以及顶部的26个）

## 训练模型
DDIM，与DDPM的区别在于将其中一项设置成0，以达到确定性采样的效果

## 评估方法
- 

## 词汇积累
1. induce - 诱发
2. stochastic - 随机
3. synthesis - n.综合 v.合成
4. identical - 相同的
5. pleural effusion - 胸腔积液
6. comprise - 包括
7. Magnetic Resonance（MR） - 核磁共振
8. axial slice - 轴向切片
9. supplementary - 补充
10. histogram equalization - 直方图均衡
11. correlate - 相关
12. exemplary - 典型的
