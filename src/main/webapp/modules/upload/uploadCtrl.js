/*
 * @Author: chenhao
 * @Date:   2015-11-23 19:33:02
 * @Last Modified by:   chenhao
 * @Last Modified time: 2015-11-23 20:11:35
 */

'use strict';
define(['angular'], function (angular) {
    return function ($scope, $http, Upload) {

        /**
         * 非插件版
         */

        //单文件上传
        $scope.upload = function () {
            var formData = new FormData();
            formData.append('file', $scope.file);
            formData.append('userName', 'chenhao');
            $http.post('rest/uploadController/upload', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (data, status) {
                console.log(data);
            }).error(function (msg, status) {
                console.log(msg);
            });
        }

        //多文件上传
        $scope.multiUpload = function () {
            var formData = new FormData();
            angular.forEach($scope.files,function(file){
                formData.append('files',file);
            });
            formData.append('userName', 'chenhao');
            $http.post('rest/multiUpload', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (data, status) {
                console.log(data);
            }).error(function (msg, status) {
                console.log(msg);
            });
        }

        /**
         * 插件版
         */
        //单文件
        $scope.progress = 0;
        $scope.pluginUpload = function () {
            Upload.upload({
                //服务端接收
                url: 'rest/uploadController/upload',
                //上传的同时带的参数
                data: {file: $scope.pluginFile, 'userName': "chenhao" }
            }).progress(function (evt) {
                //进度条
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progess:' + $scope.progress + '%' + evt.config.data.file.name);
            }).success(function (data, status, headers, config) {
                //上传成功
                console.log('file ' + config.data.file.name + 'uploaded. Response: ' + data);
                $scope.uploadImg = data;
            }).error(function (data, status, headers, config) {
                //上传失败
                console.log('error status: ' + status);
            });
        }

        //多文件
        $scope.progresses = 0;
        $scope.pluginMultiUpload = function () {
            Upload.upload({
                //服务端接收
                url: 'rest/multiUpload',
                arrayKey: '',
                //上传的同时带的参数
                data: {files: $scope.pluginFiles, 'userName': "chenhao" }
            }).progress(function (evt) {
                //进度条
                $scope.progresses = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progess:' + $scope.progresses + '%');
            }).success(function (data, status, headers, config) {
                //上传成功
                console.log('file uploaded. Response: ' + data);
                $scope.uploadImg = data;
            }).error(function (data, status, headers, config) {
                //上传失败
                console.log('error status: ' + status);
            });
        }

    };
});