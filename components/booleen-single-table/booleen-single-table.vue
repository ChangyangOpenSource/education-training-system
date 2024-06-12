<!-- <template>
	<view class="wrap">
		<view class="h1">简单table</view>
		<view class="div-table">
			<view class="tr">
				<view class="td">1</view>
				<view class="td">2</view>
				<view class="td">3</view>
			</view>
			<view class="tr">
				<view class="td">1</view>
				<view class="td">2</view>
				<view class="td">3</view>
			</view>
		</view>
		<view class="h1">跨列table</view>
		<view class="div-table">
			<view class="tr">
				<view class="td">1</view>
				<view class="td">2</view>
				<view class="td">3</view>
			</view>
			<view class="tr">
				<view class="td noPadding">
					<view class="celspan">
						<view class="td">100</view>
						<view class="td">100</view>
					</view>
				</view>
				<view class="td">2</view>
				<view class="td">3</view>
			</view>
		</view>
		<view class="h1">跨行table</view>
		<view class="div-table">
			<view class="tr">
				<view class="td">1</view>
				<view class="td">2</view>
				<view class="td">3</view>
			</view>
			<view class="tr">
				<view class="td noPadding">
					<view class="rowspan">
						<view class="tr"><view class="td">100</view></view>
						<view class="tr"><view class="td">100</view></view>
					</view>
				</view>
				<view class="td">2</view>
				<view class="td">3</view>
			</view>
		</view>

		<view class="h1">有头部的table</view>
		<view class="div-table">
			<view class="thead">
				<view class="th">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
			<view class="tr">
				<view class="td">1</view>
				<view class="td">2</view>
				<view class="td">3</view>
			</view>
			<view class="tr">
				<view class="td">1</view>
				<view class="td">2</view>
				<view class="td">3</view>
			</view>
			<view class="tr">
				<view class="td">1</view>
				<view class="td">2</view>
				<view class="td">3</view>
			</view>
			<view class="tr">
				<view class="td">1</view>
				<view class="td">2</view>
				<view class="td">3</view>
			</view>
		</view>
		<view class="h1">有头部的和body的table</view>
		<view class="div-table">
			<view class="thead">
				<view class="th">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
			<view class="tbody">
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
		</view>
		<view class="h1">固定头部，body不变的table</view>
		<view class="div-table fixed-thead">
			<view class="thead">
				<view class="th">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
			<view class="tbody">
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
		</view>

		<view class="h1">有头部的，body,底部的table</view>
		<view class="div-table">
			<view class="thead">
				<view class="th">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
			<view class="tbody">
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
			<view class="tfoot">
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
		</view>
		<view class="h1">头尾固定，内容滚动table</view>
		<view class="div-table fixed-thead">
			<view class="thead">
				<view class="th">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
			<view class="tbody">
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
			<view class="tfoot">
				<view class="tr">
					<view class="td">1</view>
					<view class="td">2</view>
					<view class="td">3</view>
				</view>
			</view>
		</view>
	</view>


</template><script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.h1 {
	text-align: left;
	font-size: 30upx;
	font-weight: bold;
	padding: 10upx 0;
}
.wrap {
	margin: 20upx;
}
$div-table-border-color: #666;
$div-table-border-width: 1upx;

.div-table {
	display: table;
	width: 100%;
	height: 100%;
	border: $div-table-border-width solid $div-table-border-color;
	box-sizing: border-box;
	table-layout: fixed;
	position: relative;
	.celspan {
		display: table;
		width: 100%;
		height: 100%;
		.td {
			display: table-cell;
			border: none !important;
		}
		.td + .td {
			border-left: $div-table-border-width solid $div-table-border-color !important;
		}
	}
	.rowspan {
		display: table;
		width: 100%;
		height: 100%;
		.tr {
			display: table-row;
			border: none !important;
		}
	}

	&.fixed-thead {
		.tbody,
		.thead,
		.tr,
		.th,
		.td {
			display: block;
		}
		.tr,
		.th {
			&:after {
				content: '';
				display: block;
				visibility: hidden;
				clear: both;
				height: 0;
			}
		}
		.td {
			float: left;
			width: 33.33%;
		}
		.tbody {
			height: 400upx;
			overflow-y: auto;
			overflow-x: hidden;
		}
	}

	.tr,
	.th {
		display: table-row;
		& + .tr,
		& + .th {
			.td,
			.th {
				border-top: $div-table-border-width solid $div-table-border-color;
				word-break: break-word;
			}
		}
	}
	.rowspan {
		.tr,
		.th {
			display: table-row;
			.td,
			.th {
				border: none;
			}
			& + .tr,
			& + .th {
				.td,
				.th {
					border-top: $div-table-border-width solid $div-table-border-color;
				}
			}
		}
	}
	.td {
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		box-sizing: border-box;
		padding: 10upx;
		&.noPadding {
			padding: 0;
		}
		& + .td {
			border-left: $div-table-border-width solid $div-table-border-color;
		}
	}
	.th .td {
		font-weight: bold;
	}
	.tbody {
		display: table-row-group;
	}
	.thead {
		display: table-header-group;
		.tr,
		.th {
			.td,
			.th {
				border-bottom: $div-table-border-width solid $div-table-border-color;
			}
		}
	}
	.tfoot {
		display: table-footer-group;
		.tr,
		.th {
			.td,
			.th {
				border-top: $div-table-border-width solid $div-table-border-color;
			}
		}
	}
	.colgroup {
		display: table-column-group;
	}
	.col {
		display: table-column;
	}
	.caption {
		display: table-caption;
	}
}
	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 99999;
		left: 50%;
		margin-left: -325rpx;
	}

.back-tankuang {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99999;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	}</style>
 -->