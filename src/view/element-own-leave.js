/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 完成视图退场动作的行为
 */

/**
 * 完成视图退场动作的行为
 */
function elementOwnLeave() {
    if (this.leaveDispose) {
        if (!this.lifeCycle.disposed) {
            this._dispose && this._dispose();

            var len = this.children.length;
            while (len--) {
                this.children[len].dispose(1, 1);
            }

            elementUnEl(this);

            // 如果没有parent，说明是一个root component，一定要从dom树中remove
            if (!this.disposeNoDetach || !this.parent) {
                removeEl(this.el);
            }

            this._toPhase('detached');

            this.el = null;
            this.sel = null;
            this.owner = null;
            this.scope = null;
            this.children = null;

            this._toPhase('disposed');

            if (this._ondisposed) {
                this._ondisposed();
            }
        }
    }
    else if (this.lifeCycle.attached) {
        removeEl(this.el);
        this._toPhase('detached');
    }
}

exports = module.exports = elementOwnLeave;
