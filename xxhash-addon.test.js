const { XXHash32, XXHash64, XXHash3, XXHash128 } = require('xxhash-addon');

const sanityBuffer = Buffer.from([
  0x00, 0x52, 0x92, 0x9b, 0xb7, 0x32, 0xa3, 0x24,
  0x2d, 0x00, 0xaf, 0x95, 0x0e, 0xec, 0xb8, 0x93,
  0xe3, 0xdf, 0xef, 0x93, 0xaa, 0xd6, 0xcd, 0x2a,
  0x53, 0x8b, 0x5c, 0x3f, 0x54, 0x5a, 0x6f, 0xd5,
  0x59, 0xc0, 0xff, 0xfc, 0x8f, 0x85, 0xb9, 0x33,
  0x1d, 0xab, 0x74, 0xf7, 0xb6, 0x05, 0x93, 0x27,
  0xb0, 0x70, 0x84, 0xb3, 0x67, 0x7c, 0x9f, 0x76,
  0x48, 0x00, 0x72, 0xed, 0x7b, 0x98, 0x17, 0xe8,
  0xdd, 0x48, 0x5e, 0x0c, 0x0c, 0xcb, 0xd0, 0x65,
  0x3f, 0xad, 0xb2, 0x8f, 0x11, 0xb0, 0x6c, 0xe8,
  0x8d, 0xb0, 0xf1, 0x86, 0x08, 0x61, 0x59, 0x56,
  0x6c, 0x8e, 0x4e, 0x78, 0x13, 0x63, 0xbd, 0xab,
  0x9d, 0x32, 0x73, 0x09, 0xea, 0x71, 0x2f, 0xd9,
  0x7a, 0x9d, 0x55, 0xf0, 0xca, 0x8a, 0xd0, 0xe9,
  0x5e, 0x1a, 0x36, 0xb3, 0x6b, 0x0f, 0xca, 0x51,
  0xef, 0x8b, 0xa2, 0xc4, 0x62, 0xed, 0x00, 0x96,
  0xf3, 0x34, 0x49, 0xeb, 0x0f, 0xd1, 0x3b, 0x92,
  0xa1, 0xa9, 0x63, 0xdb, 0xaa, 0xed, 0x3d, 0xcf,
  0xf1, 0x09, 0x42, 0xcd, 0xf9, 0xb3, 0x21, 0xa2,
  0xeb, 0xf2, 0xc8, 0xf4, 0xe4, 0x2f, 0x48, 0xd1,
  0x4b, 0x10, 0xf4, 0xc2, 0xef, 0xec, 0xf8, 0x4a,
  0xb5, 0x38, 0x74, 0xc3, 0xa4, 0xa6, 0x62, 0x0e,
  0xbf, 0xfd, 0x63, 0x37, 0x41, 0xe3, 0x86, 0x98,
  0x1a, 0xeb, 0x4c, 0xba, 0x56, 0x03, 0x66, 0x87,
  0xed, 0x00, 0x45, 0x59, 0xc1, 0x85, 0x44, 0xb6,
  0xc3, 0x68, 0xf9, 0x41, 0xa9, 0xea, 0xf9, 0x87,
  0xe0, 0x9f, 0x12, 0xd0, 0xd5, 0x14, 0x54, 0x48,
  0x5d, 0x44, 0x40, 0x51, 0xe3, 0x38, 0x06, 0x9a,
  0x4c, 0x3c, 0x0d, 0xef, 0x64, 0x89, 0xf8, 0xa3,
  0x61, 0xee, 0xe3, 0xc5, 0x1c, 0x93, 0x68, 0xc8,
  0xe5, 0x97, 0xd7, 0x09, 0x98, 0xff, 0x97, 0xa8,
  0x4c, 0xea, 0xa4, 0x79, 0xab, 0xcd, 0x2c, 0xc8,
  0x9f, 0x1b, 0xf2, 0xf1, 0xce, 0xe2, 0x82, 0x50,
  0x38, 0x82, 0xad, 0x8e, 0x9b, 0xb8, 0xb4, 0x88,
  0x81, 0x8e, 0xb6, 0x36, 0xd9, 0xa9, 0x65, 0x48,
  0x74, 0x3c, 0xc9, 0xdb, 0xfc, 0xbb, 0xd8, 0x2a,
  0x22, 0x9e, 0xb4, 0x24, 0xe2, 0xb2, 0x67, 0xab,
  0xaa, 0x13, 0xe2, 0x2a, 0x4d, 0xfc, 0x71, 0x1c,
  0x07, 0x62, 0x91, 0xbd, 0xf8, 0xe2, 0x97, 0x5d,
  0x0c, 0x84, 0xfd, 0x67, 0x45, 0x67, 0x1b, 0x09,
  0x9a, 0x4b, 0x20, 0xa2, 0x77, 0x30, 0x95, 0xda,
  0x28, 0xb1, 0x86, 0x3f, 0x9e, 0xf2, 0xe1, 0xdb,
  0x10, 0xdf, 0x90, 0xf8, 0x6d, 0x91, 0x2f, 0x06,
  0x78, 0xb3, 0x48, 0x5b, 0xdf, 0xf6, 0xdb, 0xd8,
  0x7c, 0xa7, 0xae, 0xa5, 0x89, 0x40, 0x4c, 0x02,
  0x73, 0x20, 0xf0, 0x9f, 0xdd, 0x63, 0x79, 0x95,
  0xb1, 0x03, 0xc4, 0x7e, 0x6f, 0x2f, 0xe0, 0x22,
  0xf6, 0xd4, 0x88, 0xe9, 0x66, 0x6e, 0x9d, 0x35,
  0x19, 0xbd, 0x41, 0x1b, 0x4f, 0x1a, 0xcf, 0xd5,
  0x78, 0xb0, 0x00, 0x49, 0xf0, 0x1f, 0x8f, 0x8d,
  0xf6, 0x14, 0xbc, 0xb5, 0x94, 0x6d, 0xc4, 0x53,
  0x76, 0xa7, 0xa7, 0x53, 0x91, 0xcf, 0x8d, 0xb6,
  0x16, 0x6c, 0x39, 0x7e, 0x36, 0x2f, 0x06, 0xf2,
  0x23, 0x1e, 0x8e, 0x0f, 0xc8, 0x86, 0xf4, 0x76,
  0x61, 0x8e, 0xf6, 0x64, 0x36, 0xfc, 0x8c, 0x27,
  0xa1, 0xfa, 0x12, 0xcb, 0xfe, 0xce, 0x58, 0x3f,
  0x81, 0x67, 0x88, 0x6c, 0x7d, 0xc0, 0x81, 0xe7,
  0xf8, 0xc0, 0x8e, 0x54, 0x0e, 0xc9, 0xd9, 0x51,
  0x9d, 0x21, 0x90, 0x35, 0x69, 0x0a, 0x0b, 0xac,
  0xa1, 0x71, 0x44, 0x4b, 0x9f, 0x45, 0xfe, 0x9d,
  0x98, 0x1f, 0x1e, 0x1b, 0x77, 0x6c, 0x5d, 0xf1,
  0xfb, 0x7e, 0x2c, 0x64, 0xfe, 0x6b, 0x57, 0x19,
  0x68, 0xcd, 0xdd, 0xe4, 0xd0, 0x09, 0x36, 0x1a,
  0x60, 0x99, 0x62, 0xd7, 0x07, 0xe6, 0x4d, 0x09,
  0x86, 0xf7, 0x8e, 0x9b, 0x2f, 0x42, 0xd9, 0x83,
  0xcb, 0xa5, 0xca, 0xad, 0x22, 0x62, 0x75, 0x7f,
  0x5b, 0x40, 0xef, 0x1a, 0xaf, 0xec, 0x48, 0x75,
  0x6b, 0x22, 0xb5, 0xc4, 0x05, 0x00, 0x4d, 0x2a,
  0x09, 0x7d, 0x8b, 0x8d, 0x6e, 0xbb, 0x5c, 0xd4,
  0xa6, 0xb2, 0xa1, 0x0d, 0x24, 0xac, 0xaf, 0x16,
  0xf3, 0x7f, 0x6e, 0xba, 0xfd, 0x0d, 0x07, 0x91,
  0xd2, 0x63, 0xf1, 0xbb, 0x83, 0xde, 0x41, 0x48,
  0x1b, 0x74, 0x31, 0xe2, 0xf3, 0x3f, 0x19, 0xa7,
  0x50, 0xf2, 0x4e, 0x5b, 0xae, 0x20, 0x60, 0x93,
  0xd5, 0x0c, 0x7e, 0xa5, 0x52, 0x77, 0x98, 0xec,
  0xd5, 0x2c, 0x0d, 0x52, 0xe7, 0x5c, 0xae, 0x04,
  0x84, 0xef, 0xfb, 0xae, 0xcd, 0xb4, 0x5c, 0xba,
  0xc8, 0xce, 0x98, 0x2b, 0xd0, 0xa3, 0xa2, 0xe6,
  0x25, 0x6e, 0xb9, 0xcc, 0x06, 0x6a, 0xb2, 0x7f,
  0x56, 0x57, 0x8b, 0x4c, 0xaa, 0x09, 0x21, 0x4f,
  0x4a, 0xc3, 0x90, 0x4b, 0xa9, 0xd0, 0x07, 0x36,
  0xcf, 0x54, 0x11, 0x9e, 0x27, 0xe3, 0x9f, 0x50,
  0x3f, 0x58, 0xc2, 0x94, 0xd4, 0x71, 0x88, 0xa7,
  0x81, 0x4e, 0xd7, 0x8f, 0x1e, 0x5d, 0x21, 0xdd,
  0xc2, 0x01, 0x6d, 0x5a, 0x1f, 0xd1, 0x94, 0xb6,
  0x59, 0x88, 0x5e, 0x37, 0x7d, 0x17, 0x6e, 0x8e,
  0x16, 0x55, 0x10, 0x7c, 0xcf, 0x70, 0xea, 0xe7,
  0x50, 0x29, 0xa5, 0x42, 0xe0, 0x30, 0x28, 0xa0,
  0x1e, 0x3d, 0xd5, 0x59, 0xb1, 0x68, 0x73, 0x70,
  0x22, 0xd3, 0x3d, 0x2a, 0x63, 0x46, 0x13, 0xae,
  0xdb, 0x1e, 0x35, 0x05, 0x98, 0xa1, 0xdd, 0x56,
  0xf0, 0xe3, 0xdc, 0x62, 0xb1, 0xcc, 0x25, 0x91,
  0x22, 0xdb, 0x36, 0xfc, 0x99, 0x8c, 0x81, 0x37,
  0x76, 0xd6, 0x77, 0xf3, 0xac, 0xf4, 0x4c, 0x16,
  0xa6, 0x84, 0xff, 0xda, 0x10, 0x82, 0xfc, 0x1f,
  0x4f, 0x73, 0xe8, 0x7c, 0xf5, 0xa9, 0x68, 0x29,
  0xb3, 0x7f, 0xa4, 0x7b, 0x1f, 0x2c, 0xa0, 0x10,
  0xab, 0xa8, 0x5d, 0x82, 0xad, 0xf7, 0x4e, 0xb7,
  0x13, 0x0c, 0x4d, 0x4e, 0xf5, 0x3f, 0xa3, 0x93,
  0x88, 0x92, 0xef, 0x42, 0x4c, 0xfc, 0x95, 0xbf,
  0xd2, 0x76, 0xc2, 0x92, 0x8f, 0x86, 0x90, 0x3b,
  0x7b, 0x84, 0x5f, 0x7b, 0x57, 0xc9, 0xb9, 0x5a,
  0xf8, 0x23, 0xb3, 0x26, 0x3d, 0x41, 0x1e, 0xde,
  0x09, 0x2b, 0xbd, 0xdc, 0x53, 0x13, 0x8b, 0x19,
  0x9b, 0xa2, 0xf7, 0xf5, 0x8c, 0x31, 0x73, 0x90,
  0xc5, 0xa1, 0xd3, 0xb9, 0x43, 0x70, 0x6c, 0x76,
  0x8e, 0xfe, 0x8f, 0xd3, 0x06, 0xf5, 0x9d, 0x84,
  0xd0, 0x75, 0xda, 0xfd, 0xc0, 0x74, 0xf2, 0x4b,
  0xb4, 0x2a, 0x77, 0x6f, 0xd4, 0xbe, 0x4a, 0x47,
  0x26, 0x06, 0xf0, 0x4d, 0x2c, 0x90, 0x1c, 0xde,
  0x7e, 0x08, 0x38, 0x28, 0x80, 0x16, 0x06, 0x66,
  0x3b, 0xfc, 0x74, 0xe5, 0x9c, 0x92, 0x6f, 0x26,
  0xad, 0x0e, 0x25, 0x05, 0x45, 0x1f, 0x42, 0x1f,
  0xfe, 0xba, 0x7e, 0xf6, 0x13, 0x3b, 0xe5, 0x20,
  0xac, 0xeb, 0xb0, 0xb2, 0x2a, 0x31, 0x30, 0x1a,
  0x6c, 0xc0, 0xa6, 0xa2, 0xa5, 0xf2, 0x41, 0x29,
  0x9e, 0x48, 0x19, 0xe2, 0x25, 0xc4, 0x71, 0x3a,
  0x79, 0xdd, 0xbe, 0x1f, 0xcf, 0x63, 0x43, 0x55,
  0x76, 0x13, 0x36, 0xbf, 0x3a, 0x3a, 0x70, 0x02,
  0x60, 0x00, 0xa7, 0x11, 0x4e, 0x67, 0x5d, 0x36,
  0x64, 0x0f, 0xf0, 0xdf, 0x89, 0xc0, 0x16, 0xc6,
  0x57, 0xd4, 0x70, 0x12, 0x96, 0xc9, 0x4f, 0x9b,
  0xba, 0xac, 0xc7, 0x57, 0x23, 0x85, 0xe1, 0xa0,
  0x56, 0xf9, 0x51, 0x1a, 0x2b, 0x18, 0xcf, 0xd6,
  0xa7, 0x73, 0xee, 0x01, 0xde, 0xfd, 0x63, 0xea,
  0x25, 0xc7, 0xea, 0x54, 0x73, 0xc7, 0x2a, 0x71,
  0xb3, 0xf6, 0xa5, 0x2b, 0x7a, 0x98, 0x19, 0x25,
  0x4d, 0x77, 0x95, 0x14, 0x05, 0xcf, 0x9d, 0x42,
  0xf6, 0x54, 0x4e, 0x4c, 0x77, 0xec, 0x36, 0x48,
  0xcc, 0x47, 0xac, 0x94, 0x81, 0x0d, 0x10, 0x88,
  0x50, 0xf7, 0xa2, 0xd8, 0xc1, 0xca, 0x82, 0x7b,
  0xd7, 0xc4, 0x2d, 0x09, 0x26, 0x27, 0xfb, 0xe6,
  0x06, 0x5e, 0xe7, 0xc6, 0x1a, 0xd7, 0x0a, 0xa6,
  0x40, 0x29, 0xc0, 0xe4, 0x21, 0x1a, 0x91, 0xb1,
  0x9f, 0x4d, 0x00, 0x7e, 0xda, 0xaa, 0xe2, 0x6d,
  0xa8, 0xf5, 0x13, 0x08, 0xda, 0xec, 0x11, 0x6b,
  0x33, 0x96, 0xc8, 0x9a, 0x77, 0x50, 0xe3, 0x42,
  0x62, 0x21, 0xcb, 0x80, 0x39, 0xe5, 0xf2, 0xf2,
  0x28, 0x20, 0x43, 0x18, 0x16, 0xcf, 0x20, 0xc5,
  0xc1, 0x65, 0x0b, 0x93, 0x71, 0x1c, 0x52, 0x0b,
  0x41, 0x98, 0x1e, 0xba, 0x85, 0x07, 0xce, 0x90,
  0xfb, 0xdc, 0x9b, 0x96, 0x03, 0xc8, 0xcf, 0xbf,
  0x4c, 0x0d, 0x8f, 0xaa, 0x40, 0xa0, 0x96, 0xcd,
  0x43, 0xa7, 0xb3, 0xa4, 0x8a, 0xb2, 0x9a, 0x0a,
  0x5e, 0x81, 0x2d, 0x87, 0xb6, 0x99, 0x0b, 0x05,
  0x00, 0xe2, 0x73, 0x2b, 0xbe, 0x89, 0x92, 0xd1,
  0xdf, 0xe5, 0x90, 0xa3, 0x0f, 0x47, 0xd6, 0x96,
  0x6a, 0xe6, 0x55, 0x8d, 0xb1, 0x96, 0x30, 0xff,
  0x38, 0x25, 0xf3, 0x57, 0xf7, 0xbd, 0xca, 0xe0,
  0x2e, 0xc3, 0x6a, 0x4d, 0xf3, 0xea, 0x5f, 0x14,
  0x75, 0x1d, 0x3f, 0xab, 0xda, 0x08, 0x06, 0x2b,
  0x59, 0x34, 0xe3, 0x8f, 0xdb, 0x9d, 0xfb, 0xc5,
  0x18, 0x16, 0x63, 0xf1, 0x74, 0x75, 0xde, 0xbd,
  0x52, 0x7d, 0x86, 0x7f, 0xfa, 0xf8, 0xa9, 0x76,
  0xf9, 0xcf, 0x38, 0x3a, 0x7f, 0xb9, 0x8e, 0xc2,
  0xe7, 0x0d, 0x4e, 0xb2, 0x88, 0xde, 0x12, 0xa3,
  0xb4, 0x79, 0x07, 0x69, 0x1c, 0xcc, 0xae, 0x0f,
  0x64, 0x6d, 0x4c, 0x57, 0xae, 0xd9, 0x9d, 0x83,
  0x5f, 0x10, 0x9a, 0x33, 0xe2, 0x37, 0x03, 0xaa,
  0xa9, 0xbc, 0x92, 0xe9, 0xe1, 0x1d, 0xfc, 0x64,
  0x81, 0xb9, 0x26, 0xec, 0xd2, 0xe1, 0x0d, 0x69,
  0xf6, 0x6b, 0xfe, 0x02, 0x2f, 0xa6, 0x23, 0x13,
  0x87, 0x86, 0xe4, 0xff, 0x70, 0x2c, 0xe1, 0xc6,
  0x11, 0x1b, 0x92, 0x81, 0x50, 0x68, 0xef, 0xd9,
  0x23, 0x94, 0x6d, 0x8b, 0x57, 0xcc, 0x99, 0xf3,
  0x39, 0x12, 0x9a, 0x7c, 0xf8, 0x72, 0x39, 0x43,
  0x60, 0xf1, 0x6c, 0x54, 0x89, 0xa4, 0xd8, 0xee,
  0x7f, 0x9e, 0x19, 0x11, 0xb4, 0x8b, 0x72, 0x75,
  0xab, 0x00, 0x76, 0xfe, 0xd3, 0x58, 0x99, 0x14,
  0x39, 0xa3, 0x4c, 0xea, 0x60, 0x6a, 0xff, 0x7e,
  0xd8, 0x8e, 0xab, 0x3f, 0xc5, 0x4d, 0x0c, 0xb5,
  0xc7, 0x66, 0x08, 0x3e, 0x6b, 0x39, 0xaf, 0x5b,
  0x11, 0xe3, 0x4a, 0x10, 0x0b, 0x27, 0x50, 0xcb,
  0xc0, 0x31, 0xdc, 0xb3, 0x04, 0x7f, 0xc2, 0x31,
  0x0b, 0x09, 0x92, 0xa4, 0x7e, 0x89, 0xd7, 0xa0,
  0x98, 0x70, 0xfe, 0xd2, 0x1b, 0x8c, 0x02, 0x7d,
  0x8c, 0x94, 0x80, 0x34, 0x36, 0x49, 0x07, 0xfb,
  0x97, 0x3d, 0x36, 0x9c, 0x89, 0xdd, 0xef, 0x55,
  0x90, 0xd2, 0xe5, 0xc9, 0x07, 0xcb, 0x41, 0xe2,
  0xf9, 0xe3, 0x6b, 0xc4, 0x34, 0x79, 0x18, 0x0c,
  0x11, 0x9c, 0x39, 0x73, 0x79, 0x19, 0x23, 0x47,
  0xbb, 0x30, 0x08, 0x40, 0x65, 0x09, 0xd7, 0xe0,
  0xce, 0x8c, 0x87, 0x41, 0x87, 0xee, 0x9a, 0x6f,
  0xed, 0xd1, 0x50, 0xfa, 0xce, 0xb9, 0x3e, 0xbf,
  0x7f, 0x2d, 0xcf, 0xc6, 0xf1, 0x5a, 0xcf, 0xf6,
  0x5a, 0x93, 0x0d, 0xef, 0x66, 0x3a, 0xb3, 0xa6,
  0x85, 0x6c, 0x54, 0xbf, 0x61, 0xaa, 0x38, 0x0c,
  0xfc, 0x9e, 0x97, 0xa9, 0xae, 0xa8, 0x4d, 0x23,
  0xa7, 0x32, 0xb6, 0x94, 0x75, 0x9b, 0xdf, 0x8c,
  0x60, 0x2e, 0x6d, 0x28, 0xe9, 0x18, 0x6e, 0x27,
  0xe6, 0x1d, 0x35, 0x38, 0x99, 0x6b, 0x86, 0xde,
  0x70, 0x97, 0x2e, 0x75, 0xce, 0x6a, 0xdd, 0x5e,
  0x87, 0xf1, 0x84, 0xf6, 0xe0, 0xf4, 0xdf, 0xd6,
  0x78, 0xa4, 0x33, 0x78, 0xb3, 0xe6, 0x2b, 0x45,
  0xc5, 0x1e, 0xba, 0xeb, 0xaf, 0x43, 0x4e, 0xd7,
  0x9e, 0x3a, 0xc2, 0x5e, 0xf4, 0xbb, 0x36, 0x85,
  0xe2, 0xa0, 0xdd, 0xf3, 0x0e, 0x31, 0x1d, 0x39,
  0x6e, 0x70, 0xc7, 0xb7, 0xab, 0x84, 0xa9, 0xc4,
  0x94, 0x10, 0x90, 0xba, 0xdb, 0xdc, 0x35, 0x17,
  0xa1, 0xe0, 0x39, 0x0e, 0x79, 0x84, 0xd4, 0xd5,
  0x61, 0x53, 0x6a, 0xf2, 0x72, 0x9d, 0x15, 0x1b,
  0x09, 0x95, 0xcc, 0x45, 0xa1, 0xb6, 0x0c, 0xf0,
  0x2c, 0xe3, 0xdd, 0x78, 0x9c, 0xb6, 0x20, 0x55,
  0x8b, 0x83, 0xc1, 0xc7, 0x8b, 0x8c, 0xef, 0xd3,
  0x3e, 0x2c, 0xc2, 0x19, 0x62, 0xa3, 0x52, 0x79,
  0x50, 0xa2, 0xce, 0xfe, 0xa3, 0x75, 0xb4, 0xc8,
  0x64, 0x62, 0x83, 0x9d, 0x15, 0x3b, 0x55, 0x14,
  0x16, 0xa1, 0x7d, 0xd0, 0xd5, 0x23, 0xf6, 0xa2,
  0x9e, 0xa4, 0xa6, 0x59, 0xfd, 0x8b, 0x7a, 0x9a,
  0x8e, 0x0c, 0x8c, 0x54, 0x58, 0x0e, 0x47, 0x65,
  0xe0, 0xfc, 0x05, 0x12, 0xae, 0x82, 0xd3, 0x5b,
  0x74, 0x16, 0x92, 0xf6, 0x92, 0xfd, 0x87, 0x6b,
  0x6f, 0x54, 0xaa, 0x6f, 0xda, 0x98, 0xf2, 0x1f,
  0x16, 0x43, 0xbb, 0x17, 0x12, 0x31, 0x27, 0x68,
  0x7a, 0x44, 0xc3, 0x92, 0xe4, 0xea, 0x9a, 0x5e,
  0xeb, 0x36, 0x9f, 0x38, 0xb5, 0x03, 0xdb, 0x0b,
  0xcf, 0x8a, 0xd2, 0x25, 0x60, 0x01, 0x1f, 0x91,
  0x49, 0x3c, 0x88, 0x1a, 0x5f, 0x05, 0x05, 0x98,
  0x19, 0xff, 0xfe, 0x56, 0x4c, 0x0a, 0x1c, 0x7a,
  0x87, 0x3a, 0x49, 0x94, 0xf8, 0x17, 0x45, 0xe4,
  0xbd, 0x92, 0x79, 0xa5, 0xec, 0x0a, 0x01, 0xcf,
  0xfd, 0x87, 0x1f, 0x0a, 0x0f, 0xd1, 0x61, 0xdb,
  0xb0, 0x3a, 0x02, 0x95, 0x3d, 0xa0, 0x66, 0xa2,
  0x1f, 0x82, 0xd8, 0x3d, 0x3a, 0x7a, 0xcf, 0xd9,
  0xf3, 0x79, 0x43, 0xaa, 0xb6, 0xe2, 0x7b, 0xab,
  0xe8, 0x72, 0xf4, 0x74, 0xa9, 0x95, 0x3c, 0x25,
  0x9a, 0x38, 0xa2, 0x98, 0x94, 0xba, 0x1f, 0x46,
  0xae, 0xf1, 0x88, 0x8d, 0xb8, 0x9c, 0xa8, 0x4c,
  0x8c, 0xa0, 0x8b, 0xf6, 0x9c, 0x9c, 0x6a, 0x44,
  0x50, 0xfc, 0x82, 0x1a, 0x94, 0x80, 0x56, 0xe9,
  0x7d, 0xa6, 0x13, 0xfb, 0x9d, 0x38, 0xa5, 0x6d,
  0xd4, 0x2e, 0x74, 0x42, 0x53, 0xf0, 0x76, 0x00,
  0x40, 0x6f, 0x53, 0x62, 0xba, 0x04, 0x13, 0x89,
  0xc5, 0xe3, 0xb5, 0x51, 0x2d, 0x06, 0xd7, 0x20,
  0x37, 0xe0, 0xfb, 0xdc, 0x04, 0x94, 0x41, 0xd1,
  0x1b, 0x44, 0xb4, 0x95, 0x33, 0x57, 0x60, 0xaa,
  0xb1, 0xee, 0x55, 0x6e, 0xfb, 0xc8, 0x76, 0xb2,
  0x54, 0x39, 0x22, 0x61, 0x51, 0xd2, 0x4d, 0xcd,
  0x74, 0xbc, 0x89, 0xa0, 0x65, 0xa4, 0x95, 0x48,
  0x89, 0x93, 0x84, 0x15, 0xb7, 0xa2, 0xe4, 0x06,
  0x71, 0x0f, 0x65, 0x3b, 0x9a, 0xbc, 0x53, 0x38,
  0xfb, 0x94, 0xb1, 0x6b, 0xcd, 0xa9, 0x6a, 0x7c,
  0xc8, 0x89, 0x01, 0x14, 0xdf, 0xd6, 0x03, 0xff,
  0xa5, 0xea, 0x07, 0x1a, 0xbb, 0x8d, 0x72, 0x0c,
  0x36, 0xf2, 0x05, 0x64, 0xb6, 0xe4, 0xbe, 0x43,
  0x15, 0xf3, 0x52, 0x85, 0x94, 0xe9, 0x05, 0x1b,
  0x46, 0xc5, 0x59, 0xa4, 0xc1, 0x3c, 0x02, 0x7c,
  0x36, 0xd9, 0x5e, 0xff, 0xfe, 0x96, 0xe1, 0x1c,
  0xaa, 0x56, 0x7a, 0x14, 0xe4, 0x16, 0x6f, 0x3d,
  0x90, 0x2b, 0xcd, 0x71, 0x57, 0x00, 0x5d, 0x0e,
  0xed, 0x2e, 0xfd, 0x79, 0x3e, 0x7e, 0x00, 0x8d,
  0x6c, 0x4d, 0xac, 0x40, 0x58, 0xeb, 0xce, 0x9d,
  0x35, 0x0a, 0x7f, 0x6f, 0x07, 0xf7, 0xec, 0xbe,
  0xc4, 0xb4, 0xc7, 0x5d, 0xa6, 0xeb, 0xae, 0x3c,
  0x22, 0x9d, 0x03, 0x2e, 0xa8, 0xa6, 0x8b, 0xce,
  0x62, 0xdd, 0x9e, 0x04, 0x5d, 0x9e, 0x16, 0xc8,
  0x27, 0x0a, 0x1c, 0x2c, 0x3b, 0x48, 0x1c, 0x98,
  0xf7, 0x61, 0x6e, 0xdd, 0x88, 0x72, 0xa1, 0x72,
  0x09, 0x5f, 0xa0, 0x12, 0xc9, 0x6b, 0x2c, 0x8d,
  0x56, 0xf0, 0x0f, 0x6a, 0xdf, 0x51, 0x7c, 0x1b,
  0x5d, 0x89, 0xe5, 0xf9, 0x25, 0x5e, 0xa7, 0x5b,
  0x69, 0x8a, 0x56, 0x59, 0xde, 0x7c, 0x4b, 0x37,
  0x58, 0x60, 0xd2, 0xa3, 0x40, 0x98, 0x99, 0x66,
  0x1c, 0x6b, 0x50, 0x6a, 0x9e, 0x3f, 0xd0, 0x01,
  0xc8, 0x1b, 0x62, 0x29, 0x8a, 0xcf, 0x06, 0x5f,
  0x2b, 0x00, 0x80, 0xe5, 0xcb, 0xa7, 0xcd, 0xdf,
  0xc6, 0xe6, 0xcb, 0x44, 0xf9, 0xc9, 0x61, 0x0c,
  0xd3, 0x58, 0x8b, 0xfc, 0x6f, 0xd1, 0xa9, 0x1b,
  0xc9, 0xb2, 0x0d, 0xad, 0x64, 0x47, 0x03, 0xbc,
  0xb6, 0xfc, 0x73, 0x8c, 0xbe, 0xc1, 0xd7, 0x60,
  0x22, 0x27, 0xb6, 0xda, 0x3d, 0xac, 0x95, 0x32,
  0xf4, 0x52, 0xe4, 0x90, 0xdd, 0x62, 0x24, 0xac,
  0xa1, 0x1d, 0xe1, 0x7d, 0x69, 0xb8, 0xd1, 0x6a,
  0xa3, 0x23, 0xd9, 0xcc, 0x8c, 0xab, 0xb4, 0x1d,
  0x93, 0x5f, 0x21, 0x74, 0xdf, 0xa0, 0x63, 0xc4,
  0x7b, 0x78, 0x93, 0xd6, 0x55, 0x48, 0xca, 0x72,
  0xd7, 0x3c, 0x1c, 0xf5, 0x43, 0xe6, 0xd2, 0x2a,
  0xac, 0x8c, 0xf7, 0x1c, 0x7a, 0xa8, 0xba, 0x9a,
  0x6b, 0xce, 0x4a, 0xa3, 0x90, 0x85, 0xf5, 0x08,
  0xd6, 0xe6, 0xa5, 0x37, 0xa1, 0xa6, 0x1d, 0x58,
  0xaf, 0x07, 0x4d,
]);

const XXH3_SECRET_SIZE_MIN = 136,
  startByte = 7,
  endByte = startByte + XXH3_SECRET_SIZE_MIN + 11;

const secret = sanityBuffer.slice(startByte, endByte);

const seed = 2654435761;
// big_seed is simply the UInt64 11400714785074694797
const big_seed = Buffer.from([0x9e, 0x37, 0x79, 0xb1, 0x85, 0xeb, 0xca, 0x8d]);

// Initialize all possible hashers
const hasher32NoSeed = new XXHash32();
const hasher32Seeded = new XXHash32(seed);

const hasher64NoSeed = new XXHash64();
const hasher64Seeded = new XXHash64(seed);

const hasher3NoSeed = new XXHash3();
const hasher3Seeded = new XXHash3(big_seed);
const hasher3Secret = new XXHash3(secret);

const hasher128NoSeed = new XXHash128();
const hasher128Seeded = new XXHash128(seed);

describe('XXHash32', () => {
  test('non-constructor-call should throw', () => {
    expect(() => {
      const hasher = XXHash32();
    }).toThrow('You must invoke a constructor call using \'new\'');
  });

  // test('empty argument list should throw', () => {
  //   expect(() => {
  //     const hasher = new XXHash32();
  //   }).toThrow('You must specify seed value');
  // });

  test('unexpected types should throw', () => {
    expect(() => {
      const hasher = new XXHash32('hello');
    }).toThrow('seed must be a buffer or a number');
  });

  test('unexpected buffers should throw', () => {
    expect(() => {
      const hasher = new XXHash32(Buffer.from([0x00, 0x00]));
    }).toThrow('seed must be 4-byte long');
  });

  test('default seed value is 0', () => {
    const hasher0 = new XXHash32(0);
    const h1 = hasher32NoSeed.hash(sanityBuffer).toString('hex');
    const h2 = hasher0.hash(sanityBuffer).toString('hex');
    expect(h2).toEqual(h1);
  });

  test('with seed = 0', () => {
    expect(hasher32NoSeed.hash(sanityBuffer.slice(0, 1)).toString('hex').toUpperCase()).toBe('CF65B03E');
    expect(hasher32NoSeed.hash(sanityBuffer.slice(0, 222)).toString('hex').toUpperCase()).toBe('5BD11DBD');
  });

  test('with seed', () => {
    expect(hasher32Seeded.hash(sanityBuffer.slice(0, 1)).toString('hex').toUpperCase()).toBe('B4545AA4');
    expect(hasher32Seeded.hash(sanityBuffer.slice(0, 222)).toString('hex').toUpperCase()).toBe('58803C5F');
  });

  test('streaming', () => {
    hasher32Seeded.update(sanityBuffer.slice(0, 1));
    expect(hasher32Seeded.digest().toString('hex').toUpperCase()).toBe('B4545AA4');
    hasher32Seeded.update(sanityBuffer.slice(1, 222));
    expect(hasher32Seeded.digest().toString('hex').toUpperCase()).toBe('58803C5F');

    hasher32Seeded.reset();
    hasher32Seeded.update(sanityBuffer.slice(0, 1));
    expect(hasher32Seeded.digest().toString('hex').toUpperCase()).toBe('B4545AA4');
  });
});

describe('XXHash64', () => {
  test('non-constructor-call should throw', () => {
    expect(() => {
      const hasher = XXHash64();
    }).toThrow('You must invoke a constructor call using \'new\'');
  });

  // test('empty argument list should throw', () => {
  //   expect(() => {
  //     const hasher = new XXHash64();
  //   }).toThrow('You must specify seed value');
  // });

  test('unexpected types should throw', () => {
    expect(() => {
      const hasher = new XXHash64('hello');
    }).toThrow('seed must be a buffer or a number');
  });

  test('unexpected buffers should throw', () => {
    expect(() => {
      const hasher = new XXHash64(Buffer.from([0x00, 0x00]));
    }).toThrow('seed must be 4-byte or 8-byte long');
  });

  test('default seed value is 0', () => {
    const hasher0 = new XXHash64(0);
    const h1 = hasher64NoSeed.hash(sanityBuffer).toString('hex');
    const h2 = hasher0.hash(sanityBuffer).toString('hex');
    expect(h2).toEqual(h1);
  });

  test('with seed = 0', () => {
    expect(hasher64NoSeed.hash(sanityBuffer.slice(0, 1)).toString('hex').toUpperCase()).toBe('E934A84ADB052768');
    expect(hasher64NoSeed.hash(sanityBuffer.slice(0, 222)).toString('hex').toUpperCase()).toBe('B641AE8CB691C174');
  });

  test('with seed', () => {
    expect(hasher64Seeded.hash(sanityBuffer.slice(0, 1)).toString('hex').toUpperCase()).toBe('5014607643A9B4C3');
    expect(hasher64Seeded.hash(sanityBuffer.slice(0, 222)).toString('hex').toUpperCase()).toBe('20CB8AB7AE10C14A');
  });

  test('streaming', () => {
    hasher64Seeded.update(sanityBuffer.slice(0, 1));
    expect(hasher64Seeded.digest().toString('hex').toUpperCase()).toBe('5014607643A9B4C3');
    hasher64Seeded.update(sanityBuffer.slice(1, 222));
    expect(hasher64Seeded.digest().toString('hex').toUpperCase()).toBe('20CB8AB7AE10C14A');

    hasher64Seeded.reset();
    hasher64Seeded.update(sanityBuffer.slice(0, 1));
    expect(hasher64Seeded.digest().toString('hex').toUpperCase()).toBe('5014607643A9B4C3');
  });
});


describe('XXHash3', () => {
  test('non-constructor-call should throw', () => {
    expect(() => {
      const hasher = XXHash3();
    }).toThrow('You must invoke a constructor call using \'new\'');
  });

  // test('empty argument list should throw', () => {
  //   expect(() => {
  //     const hasher = new XXHash3();
  //   }).toThrow('You must specify seed value');
  // });

  test('unexpected types should throw', () => {
    expect(() => {
      const hasher = new XXHash3('hello');
    }).toThrow('seed must be a buffer or a number');
  });

  test('unexpected buffers should throw', () => {
    expect(() => {
      const hasher = new XXHash3(Buffer.from([0x00, 0x00]));
    }).toThrow('secret too small');
  });

  test('default seed value is 0', () => {
    const hasher0 = new XXHash3(0);
    const h1 = hasher3NoSeed.hash(sanityBuffer).toString('hex');
    const h2 = hasher0.hash(sanityBuffer).toString('hex');
    expect(h2).toEqual(h1);
  });

  test('with seed = 0', () => {
    expect(hasher3NoSeed.hash(sanityBuffer.slice(0, 1)).toString('hex').toUpperCase()).toBe('7198D737CFE7F386');
    expect(hasher3NoSeed.hash(sanityBuffer).toString('hex').toUpperCase()).toBe('A559D20581D742D3');
  });

  test('with seed', () => {
    expect(hasher3Seeded.hash(sanityBuffer.slice(0, 1)).toString('hex').toUpperCase()).toBe('B70252DB7161C2BD');
    expect(hasher3Seeded.hash(sanityBuffer).toString('hex').toUpperCase()).toBe('96E051AB57F21FC8');
  });

  test('with secret', () => {
    expect(hasher3Secret.hash(sanityBuffer.slice(0, 1)).toString('hex').toUpperCase()).toBe('7F69735D618DB3F0');
    expect(hasher3Secret.hash(sanityBuffer).toString('hex').toUpperCase()).toBe('3446E248A00CB44A');
  });

  test('streaming', () => {
    hasher3Secret.update(sanityBuffer.slice(0, 1));
    expect(hasher3Secret.digest().toString('hex').toUpperCase()).toBe('7F69735D618DB3F0');
    hasher3Secret.update(sanityBuffer.slice(1));
    expect(hasher3Secret.digest().toString('hex').toUpperCase()).toBe('3446E248A00CB44A');

    hasher3Secret.reset();
    hasher3Secret.update(sanityBuffer.slice(0, 1));
    expect(hasher3Secret.digest().toString('hex').toUpperCase()).toBe('7F69735D618DB3F0');
  });
});

describe('XXHash128', () => {

  test('non-constructor-call should throw', () => {
    expect(() => {
      const hasher = XXHash128();
    }).toThrow('You must invoke a constructor call using \'new\'');
  });

  test('unexpected types should throw', () => {
    expect(() => {
      const hasher = new XXHash128('hello');
    }).toThrow('seed must be a buffer or a number');
  });

  test('unexpected buffers should throw', () => {
    expect(() => {
      const hasher = new XXHash128(Buffer.from([0x00, 0x00]));
    }).toThrow('secret too small');
  });

  test('default seed value is 0', () => {
    const hasher0 = new XXHash128(0);
    const h1 = hasher128NoSeed.hash(sanityBuffer).toString('hex');
    const h2 = hasher0.hash(sanityBuffer).toString('hex');
    expect(h2).toEqual(h1);
  });

  test('with seed = 0', () => {
    expect(hasher128NoSeed.hash(sanityBuffer.slice(0, 1)).toString('hex').toUpperCase())
      .toBe('153C28D2A04DC8077198D737CFE7F386');
    expect(hasher128NoSeed.hash(sanityBuffer.slice(0, 2237)).toString('hex').toUpperCase())
      .toBe('4BBD06FF7BFF0AB1970C91411533862C');
  });

  test('with seed', () => {
    expect(hasher128Seeded.hash(sanityBuffer.slice(0, 1)).toString('hex').toUpperCase())
      .toBe('89A7484EC876D5458E05996EC27C0F46');
    expect(hasher128Seeded.hash(sanityBuffer.slice(0, 2237)).toString('hex').toUpperCase())
      .toBe('14EBB157B84D9785D80282846D814431');
  });

  test('streaming', () => {
    hasher128Seeded.update(sanityBuffer.slice(0, 1));
    expect(hasher128Seeded.digest().toString('hex').toUpperCase()).toBe('89A7484EC876D5458E05996EC27C0F46');
    hasher128Seeded.update(sanityBuffer.slice(1, 2237));
    expect(hasher128Seeded.digest().toString('hex').toUpperCase()).toBe('14EBB157B84D9785D80282846D814431');

    hasher128Seeded.reset();
    hasher128Seeded.update(sanityBuffer.slice(0, 1));
    expect(hasher128Seeded.digest().toString('hex').toUpperCase()).toBe('89A7484EC876D5458E05996EC27C0F46');
  });
});
